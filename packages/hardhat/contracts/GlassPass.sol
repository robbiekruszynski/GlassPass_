// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/math/Math.sol';

contract TicketStorage {
    using Math for int256;

    error AlreadyClaimed(uint256 ticketClaimableAt);

    struct Coordinates {
        // 1e6 decimals
        int256 latitude;
        int256 longitude;
    }

    struct Ticket {
        uint256 id;
        address owner;
        bytes pkey;
        Coordinates coordinates;
        uint256 claimedUntil;
    }

    // Mapping from user address to a mapping of ticket ID to Ticket
    mapping(string => mapping(uint256 => Ticket)) private eventTickets;

    // Mapping from event string to total current ticket count
    mapping(string => uint256) private eventTicketCounts;

    event TicketUploaded(string indexed eventId, address indexed owner, uint256 indexed ticketId);
    event TicketOwnerChanged(string indexed eventId, address indexed owner, uint256 indexed ticketId);

    function uploadTicket(string memory eventId, bytes memory _pkey, int256 longitude, int256 latitude) public {
        Coordinates memory _coordinates = Coordinates(latitude, longitude);

        uint256 newTicketId = eventTicketCounts[eventId];
        eventTickets[eventId][newTicketId] = Ticket(newTicketId, msg.sender, _pkey, _coordinates, 0);
        eventTicketCounts[eventId]++;

        emit TicketUploaded(eventId, msg.sender, newTicketId);
    }

    function getTicket(string memory eventId, uint256 _ticketId) public view returns (Ticket memory) {
        return eventTickets[eventId][_ticketId];
    }

    function getTicketCount(string memory _eventId) public view returns (uint256) {
        return eventTicketCounts[_eventId];
    }

    function reserveTicket(string memory eventId, uint256 ticketId) public {
        Ticket memory ticket = eventTickets[eventId][ticketId];
        if (ticket.claimedUntil < block.number)
            revert AlreadyClaimed(ticket.claimedUntil);

        ticket.owner = msg.sender;
        ticket.claimedUntil = block.number + 150; // Claimed for 30 minutes

        emit TicketOwnerChanged(eventId, msg.sender, ticketId);
    }

    function queryEventLocation(string memory eventId, uint256 ticketId) public view returns (Coordinates memory coordinates) {
        Ticket memory ticket = eventTickets[eventId][ticketId];
        require(ticket.owner == msg.sender, "Activation unauthorized");

        return ticket.coordinates;
    }

    function activateTicket(string memory eventId, uint256 ticketId, int256 _longitude, int256 _latitude) public view returns (bytes memory) {
        Ticket memory ticket = eventTickets[eventId][ticketId];
        require(ticket.owner == msg.sender, "Activation unauthorized");
        
        uint256 distance = calculateDistance(ticket, _latitude, _longitude);
        require(distance < 4000, "Too far from event to activate");

        return ticket.pkey;
    }

    function calculateDistance(Ticket memory ticket, int256 x1, int256 y1) internal pure returns (uint256) {
        int256 dx = ticket.coordinates.latitude - x1;
        int256 dy = ticket.coordinates.longitude - y1;
        uint256 inner = uint256(dx * dx + dy * dy);
        return Math.sqrt(inner);
    }
}
