const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        GlassPass: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "ticketClaimableAt",
                  type: "uint256",
                },
              ],
              name: "AlreadyClaimed",
              type: "error",
            },
            {
              inputs: [],
              name: "SignerNotMessageSender",
              type: "error",
            },
            {
              inputs: [],
              name: "SignerNotOwner",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "claimableAt",
                  type: "uint256",
                },
              ],
              name: "TicketOwnerChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
              ],
              name: "TicketUploaded",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
                {
                  internalType: "int256",
                  name: "_longitude",
                  type: "int256",
                },
                {
                  internalType: "int256",
                  name: "_latitude",
                  type: "int256",
                },
              ],
              name: "activateTicket",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_ticketId",
                  type: "uint256",
                },
              ],
              name: "getTicket",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "id",
                      type: "uint256",
                    },
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "euint256",
                      name: "pkey",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "int256",
                          name: "latitude",
                          type: "int256",
                        },
                        {
                          internalType: "int256",
                          name: "longitude",
                          type: "int256",
                        },
                      ],
                      internalType: "struct GlassPass.Coordinates",
                      name: "coordinates",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "claimedUntil",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct GlassPass.Ticket",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_eventId",
                  type: "string",
                },
              ],
              name: "getTicketCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "ticketId",
                  type: "uint256",
                },
              ],
              name: "queryEventLocation",
              outputs: [
                {
                  components: [
                    {
                      internalType: "int256",
                      name: "latitude",
                      type: "int256",
                    },
                    {
                      internalType: "int256",
                      name: "longitude",
                      type: "int256",
                    },
                  ],
                  internalType: "struct GlassPass.Coordinates",
                  name: "coordinates",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
              ],
              name: "tryReserveTicket",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "eventId",
                  type: "string",
                },
                {
                  components: [
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct inEuint256",
                  name: "_pkey",
                  type: "tuple",
                },
                {
                  internalType: "int256",
                  name: "longitude",
                  type: "int256",
                },
                {
                  internalType: "int256",
                  name: "latitude",
                  type: "int256",
                },
              ],
              name: "uploadTicket",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
