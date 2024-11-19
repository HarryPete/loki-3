export const customerProfiles = [
    {
      type: "individual",
      name: "John Doe",
      id: "CUST001",
      age: 45,
      occupation: "Business Owner",
      address: "123 Elm St, New York, USA",
      email: "johndoe@example.com",
      phone: "+1-555-0101",
      organization: "Doe Holdings",
      riskScore: 
      [
        { customerType : "Software", score: 1 },
        { product : "Lasers", score: 5  },
        { location: "Turkey", score: 2  }
      ],
      documents:
      [
        { id1: "passport" },
        { id2: "rent agreement" } 
      ]
    },
    {
      name: "Jane Smith",
      id: "CUST002",
      age: 37,
      occupation: "Investor",
      address: "456 Oak Rd, San Francisco, USA",
      email: "janesmith@example.com",
      phone: "+1-555-0202",
      organization: "Smith Capital"
    },
    {
      name: "Henry Wilson",
      id: "CUST003",
      age: 29,
      occupation: "Crypto Trader",
      address: "789 Pine Ave, Miami, USA",
      email: "henrywilson@example.com",
      phone: "+1-555-0303",
      organization: "Wilson Crypto Ventures"
    },
    {
      name: "Alice Cooper",
      id: "CUST004",
      age: 50,
      occupation: "Banker",
      address: "321 Maple Dr, Chicago, USA",
      email: "alicecooper@example.com",
      phone: "+1-555-0404",
      organization: "Sunshine Bank"
    },
    {
      name: "William Brown",
      id: "CUST005",
      age: 42,
      occupation: "Freelancer",
      address: "654 Cedar Blvd, Los Angeles, USA",
      email: "williambrown@example.com",
      phone: "+1-555-0505",
      organization: "Brown Freelance Services"
    },
    {
      name: "XYZ Ltd",
      id: "CUST006",
      age: null,
      occupation: "Corporate Entity",
      address: "987 Spruce St, Seattle, USA",
      email: "contact@xyzltd.com",
      phone: "+1-555-0606",
      organization: "XYZ Ltd"
    },
    {
      name: "James Lee",
      id: "CUST007",
      age: 34,
      occupation: "Software Engineer",
      address: "159 Palm Ave, Austin, USA",
      email: "jameslee@example.com",
      phone: "+1-555-0707",
      organization: "Tech Solutions Inc."
    },
    {
      name: "Mary Johnson",
      id: "CUST008",
      age: 48,
      occupation: "Private Investor",
      address: "753 Willow Ln, Denver, USA",
      email: "maryjohnson@example.com",
      phone: "+1-555-0808",
      organization: "Johnson Investments"
    },
    {
      type: "Entity",
      name: "Enterprise Inc",
      id: "CUST009",
      age: null,
      occupation: "Corporate Entity",
      address: "951 Redwood Rd, Houston, USA",
      email: "info@enterpriseinc.com",
      phone: "+1-555-0909",
      organization: "Enterprise Inc",
      ownerId: "individual",
      docs:
      [{
        li1 : "Trade"
      },
      {
        li2: "MOA"
      }]
    }
    ,
    {
      name: "George Mason",
      id: "CUST010",
      age: 39,
      occupation: "Entrepreneur",
      address: "147 Cypress Ct, Boston, USA",
      email: "georgemason@example.com",
      phone: "+1-555-1010",
      organization: "Mason Holdings"
    }
  ];
  