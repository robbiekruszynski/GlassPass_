// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/Math.sol';
import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";

contract TicketStorage is Permissioned {
    error AlreadyClaimed(uint256 ticketClaimableAt);

    struct Coordinates {
        // 1e6 decimals
        int256 latitude;
        int256 longitude;
    }

    struct Ticket {
        uint256 id;
        address owner;
        euint256 pkey;
        Coordinates coordinates;
        uint256 claimedUntil;
    }

    // Mapping from user address to a mapping of ticket ID to Ticket
    mapping(string => mapping(uint256 => Ticket)) private eventTickets;

    // Mapping from event string to total current ticket count
    mapping(string => uint256) private eventTicketCounts;

    event TicketUploaded(string indexed eventId, address indexed owner, uint256 indexed ticketId);
    event TicketOwnerChanged(string indexed eventId, address indexed owner, uint256 indexed ticketId, uint256 claimableAt);

    function uploadTicket(string memory eventId, inEuint256 calldata _pkey, int256 longitude, int256 latitude) public {
        Coordinates memory _coordinates = Coordinates(latitude, longitude);

        uint256 newTicketId = eventTicketCounts[eventId];
        euint256 pkey = FHE.asEuint256(_pkey);
        eventTickets[eventId][newTicketId] = Ticket(newTicketId, msg.sender, pkey, _coordinates, 0);
        eventTicketCounts[eventId]++;

        emit TicketUploaded(eventId, msg.sender, newTicketId);
    }

    function getTicket(string memory eventId, uint256 _ticketId) public view returns (Ticket memory) {
        return eventTickets[eventId][_ticketId];
    }

    function getTicketCount(string memory _eventId) public view returns (uint256) {
        return eventTicketCounts[_eventId];
    }

    function tryReserveTicket(string memory eventId) public {
        uint256 initialTicketCount = getTicketCount(eventId);
        require(initialTicketCount > 0, "Event does not have any available tickets."); 
        uint256 ticketCount = initialTicketCount;

        while (ticketCount > 0) {
            ticketCount--;
            Ticket memory ticket = eventTickets[eventId][ticketCount];

            if (ticket.claimedUntil > block.number) {
                revert AlreadyClaimed(ticket.claimedUntil);
            }
        }

        reserveTicket(eventId, ticketCount);
    }

    function reserveTicket(string memory eventId, uint256 ticketId) internal {
        Ticket storage ticket = eventTickets[eventId][ticketId];
        ticket.owner = msg.sender;
        uint256 reserveUntil = block.number + 150; // Claimed for 30 minutes
        ticket.claimedUntil = reserveUntil;

        emit TicketOwnerChanged(eventId, msg.sender, ticket.id, block.number + 150);
    }

    function queryEventLocation(string memory eventId, uint256 ticketId) public view returns (Coordinates memory coordinates) {
        Ticket memory ticket = eventTickets[eventId][ticketId];
        require(ticket.owner == msg.sender, "Activation unauthorized");

        return ticket.coordinates;
    }

    function activateTicket(string memory eventId, uint256 ticketId, int256 _longitude, int256 _latitude) public view returns (uint256) {
        Ticket memory ticket = eventTickets[eventId][ticketId];
        require(ticket.owner == msg.sender, "Activation unauthorized");
        
        uint256 distance = calculateDistance(ticket, _latitude, _longitude);
        require(distance < 4000, "Too far from event to activate");

        uint256 output = FHE.decrypt(ticket.pkey);
        return output;
    }

    function decrypt(euint256 _cipherText) internal pure returns (uint256) {
        return FHE.decrypt(_cipherText);
    }

    function calculateDistance(Ticket memory ticket, int256 x1, int256 y1) internal pure returns (uint256) {
        int256 dx = ticket.coordinates.latitude - x1;
        int256 dy = ticket.coordinates.longitude - y1;
        uint256 inner = uint256(dx * dx + dy * dy);
        return Math.sqrt(inner);
    }
}
