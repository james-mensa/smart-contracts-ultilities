pragma solidity >=0.7.0 <0.9.0;

// SPDX-License-Identifier: GPL-3.0

contract Ballot {
    struct voterHistory {
        bool voted; // if true, that person already voted
        address delegate; // person delegated to
        uint256 vote; // index of the voted proposal
        bytes32 candidateName;
        uint256 pool_id;
        bytes32 pool_title;
    }
    struct Voter {
        mapping(address => bytes32) partiesAuthorized; // weight is accumulated by delegation
        mapping(uint256 pool_id => voterHistory) history;
        uint256 authorized_party;
        address account;
        uint256 weight;
        uint256 totalVoteEvents;
        bool rightToVote;
    }

    struct Party {
        address account;
        bytes32 name;
        bytes img_url;
    }

    struct Event {
        uint256 id;
        address chairperson;
        bytes name;
        uint256 startdate;
        uint256 enddate;
        mapping(address => Party) parties;
        uint256 total_parties;
        mapping(address => Voter) voters;
        uint256 total_voters;
        address[] parties_address;
        mapping(uint256 => Pool) Ballots;
        uint256 total_ballots;
        bytes img_url;
    }

    struct Candidate {
        bytes32 name; // short name (up to 32 bytes)
        bytes img_url;
        uint256 voteCount; // number of accumulated votes
   
    }
    struct InputCandidate {
        bytes32 name; // short name (up to 32 bytes)
        bytes img_url;
       
   
    }

    address[] public poolParties;
    uint256 public electionID;
    uint256 public totalElectionEvents;
    mapping(uint256 => Event) public Elections;

    struct Pool {
        uint256 id;
        mapping(uint256 => Candidate) candidates;
        uint256 candidateCount;
        bool general;
        bytes32 name;
        uint256 totalVotes;
        uint256 election_id;
    }

    modifier checkPartyAccount(Party[] memory _parties) {
        bool Invalid;
        for (uint256 i = 0; i < _parties.length; i++) {
            if (msg.sender == _parties[i].account) {
                Invalid = true;
            }

            require(!Invalid, "chairperson can not be member of a party");
        }

        _;
    }

    function newElectionEvent(
        bytes memory name,
        uint256 startdate,
        uint256 enddate,
        Party[] memory _parties,
        bytes memory _img_url
    ) public checkPartyAccount(_parties) {
        require(startdate < enddate, "Invalid election dates");
        require(
            startdate > block.timestamp,
            "Invalid election dates(start date last the block time)"
        );
        // Increment election ID
        electionID++;

        // Create the Event struct for this election without initializing the mapping
        Event storage newElection = Elections[electionID];
        newElection.id = electionID;
        newElection.chairperson = msg.sender;
        newElection.name = name;
        newElection.startdate = startdate;
        newElection.enddate = enddate;
        newElection.total_parties = _parties.length;
        newElection.img_url=_img_url;
      
        // Populate the parties array
        for (uint256 i = 0; i < _parties.length; i++) {
            newElection.parties[_parties[i].account] =Party( _parties[i].account, _parties[i].name, _parties[i].img_url) ;
            newElection.parties_address.push(_parties[i].account);
        }
        totalElectionEvents++;
    }

    modifier voterExistsInElectionEvent(uint256 _electionID, address _voter) {
        require(
            msg.sender == Elections[_electionID].chairperson,
            "Only chairperson has the right to add voters"
        );
        require(
            Elections[_electionID].voters[_voter].account != _voter,
            "Voter already exits"
        );
        _;
    }

    function addVoterToElectionEvent(
        uint256 _electionID,
        address _voter
    ) public voterExistsInElectionEvent(_electionID, _voter) {
        Voter storage electionVoters = Elections[_electionID].voters[_voter];
        // electionVoters.partiesAuthorized = parties;
        // electionVoters.historyvoted = false;
        // electionVoters.delegate = address(0);
        // electionVoters.vote = 0;
        // electionVoters.weight = 0;
        electionVoters.account = _voter;
        Elections[_electionID].total_voters++;
    }

    function addVotersToElectionEvent(
        uint256 _electionID,
        address[] memory _voters
    ) public {
        require(
            msg.sender == Elections[_electionID].chairperson,
            "Only chairperson has the right to add voters"
        );
        for (uint256 i = 0; i < _voters.length; i++) {
            if (
                Elections[_electionID].voters[_voters[i]].account != _voters[i]
            ) {
                Voter storage electionVoters = Elections[_electionID].voters[
                    _voters[i]
                ];

                // electionVoters.delegate = address(0);
                // electionVoters.vote = 0;
                // electionVoters.weight = 0;
                electionVoters.account = _voters[i];
                Elections[_electionID].total_voters++;
            }
        }
    }

    function addBallotEvent(
        uint256 election_id,
        InputCandidate[] memory _candidates,
        bool _general,
        bytes32 _name
    ) public {
        require(election_id <= electionID, "Event does not exist");
        require(
            Elections[election_id].chairperson == msg.sender,
            "Only chairperson can add ballot event"
        );

        require(
            block.timestamp < Elections[election_id].startdate,
            "Adding new Pool not permitted"
        );

        // Get total number of ballots

        Elections[election_id].total_ballots++;
        uint256 totalballot = Elections[election_id].total_ballots;

        // Create new pool
        Pool storage newPool = Elections[election_id].Ballots[totalballot];
        newPool.election_id = election_id;
        initializePool(newPool, totalballot, _general, _name);

        // Populate candidates
        for (uint256 i = 0; i < _candidates.length; i++) {
            addCandidateToPool(newPool, i, _candidates[i]);
        }
    }

    function initializePool(
        Pool storage _pool,
        uint256 _id,
        bool _general,
        bytes32 _name
    ) internal {
        _pool.id = _id;
        _pool.general = _general;
        _pool.name = _name;
    }

    function addCandidateToPool(
        Pool storage _pool,
        uint256 _id,
        InputCandidate memory _candidate
        
    ) internal {
        _pool.candidates[_id] = Candidate(_candidate.name,_candidate.img_url, 0);
        _pool.candidateCount++;
    }

    modifier validateParty(
        address voter,
        uint256 election_id,
        bytes32 _name
    ) {
    
        require(election_id != 0, "Event does not exist");
        require(election_id <= electionID, "Election does not exist");
        bool valid;
    require(
            Elections[election_id].voters[voter].account == voter,
            "Voter not added to voting list yet  contact your administration"
        );
        for (uint256 i = 0; i < Elections[election_id].total_parties; i++) {
            if (Elections[election_id].parties[msg.sender].name == _name) {
                valid = true;
            }
        }
        require(valid, "Only Party can give right to vote.");
        bool authorized;
        for (uint256 i = 0; i < Elections[election_id].total_parties; i++) {
            if (
                Elections[election_id].voters[voter].partiesAuthorized[
                    msg.sender
                ] == _name
            ) {
                authorized = true;
            }
        }
        require(!authorized, "You have already Authorized voter. Thank you");
        _;
    }

    function verifyVoter(
        uint256 election_id,
        address voter,
        bytes32 name
    ) public validateParty(voter, election_id, name) {
        // require(
        //     !Elections[election_id].voters[voter].voted,
        //     "The voter already voted."
        // );

        Elections[election_id].voters[voter].partiesAuthorized[
            msg.sender
        ] = name;
        Elections[election_id].voters[voter].authorized_party++;

        bool validated = Elections[election_id]
            .voters[voter]
            .authorized_party == Elections[election_id].total_parties;

        if (validated) {
            Elections[election_id].voters[voter].weight = 1;
            Elections[election_id].voters[voter].rightToVote=true;
        }
    }

    function getElection(
        uint256 election_id
    )
        public
        view
        returns (
            uint256 id,
            address chairperson,
            bytes memory name,
            uint256 startdate,
            uint256 enddate,
            bytes32[] memory partyNames,
            address[] memory partyAccount,
            bytes[] memory partyimg_urls,
            uint total_parties,
            uint total_ballots,
            uint total_voters
          
        )
    {
        require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
        Event storage election = Elections[election_id];

        // Pre-allocate memory for party names array
        partyNames = new bytes32[](election.total_parties);
        partyimg_urls = new bytes[](election.total_parties);
        // Loop through parties and assign names to the partyNames array
        for (uint256 i = 0; i < election.total_parties; i++) {
            partyNames[i] = election.parties[election.parties_address[i]].name;
            partyimg_urls[i]= election.parties[election.parties_address[i]].img_url;
        }

        return (
            election.id,
            election.chairperson,
            election.name,
            election.startdate,
            election.enddate,
            partyNames,
            election.parties_address,
            partyimg_urls,
            election.total_parties,
            election.total_ballots,
            election.total_voters
       
        );
    }
    function getTime() public view returns (uint256 time) {
        return block.timestamp;
    }

    function getBallot(
        uint256 election_id,
        uint256 ballot_id
    )
        public
        view
        returns (
            uint256 id,
            bytes32 name,
            Candidate[] memory candidates,
            uint256 totalVotes,
            uint256 candidateCount,
            uint256 event_id
        )
    {
        require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
        require(
            ballot_id <= Elections[election_id].total_ballots,
            "Pool event does not exist"
        );
        require(ballot_id != 0, "Pool event does not exist");

        Pool storage ballot = Elections[election_id].Ballots[ballot_id];
        Candidate[] memory allCandidates = new Candidate[](
            ballot.candidateCount
        );
        for (uint256 i = 0; i < ballot.candidateCount; i++) {
            allCandidates[i] = Candidate(
                ballot.candidates[i].name,
                  ballot.candidates[i].img_url,
                ballot.candidates[i].voteCount
            );
        }
        // Pre-allocate memory for party names array

        // Loop through parties and assign names to the partyNames array

        return (
            ballot.id,
            ballot.name,
            allCandidates,
            ballot.totalVotes,
            ballot.candidateCount,
            election_id
        );
    }

    function vote(
        uint256 election_id,
        uint256 ballot_id,
        uint256 choice
    ) public {
        require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
        require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
        
        require(
            ballot_id <= Elections[election_id].total_ballots,
            "Pool event does not exist"
        );
        require(ballot_id != 0, "Pool event does not exist");

        Event storage election = Elections[election_id];
        require(
            election.voters[msg.sender].account == msg.sender,
            "Sorry you are not added to voting list yet, contact your party head"
        );
        require(Elections[election_id].voters[msg.sender].rightToVote,"validation failed, check your status to confirm");
        require(
            election.voters[msg.sender].history[ballot_id].voted != true,
            "Already voted"
        );
        Pool storage ballot = Elections[election_id].Ballots[ballot_id];
        ballot.candidates[choice].voteCount=ballot.candidates[choice].voteCount+ election.voters[msg.sender].weight;
        election.voters[msg.sender].history[ballot_id].voted = true;
        election.voters[msg.sender].history[ballot_id].pool_title = ballot.name;
        election.voters[msg.sender].history[ballot_id].vote = choice;
        election.voters[msg.sender].history[ballot_id].candidateName = ballot
            .candidates[choice]
            .name;
        election.voters[msg.sender].history[ballot_id].pool_id = ballot_id;
        election.voters[msg.sender].totalVoteEvents++;
        ballot.totalVotes++;
    }

    function getVoterHistory(
        uint256 election_id
    ) public view returns (voterHistory[]
     memory) {

             require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
          require(
             Elections[election_id].voters[msg.sender].account == msg.sender,
            "Sorry you are not added to voting list yet, contact your party head"
        );
        Event storage election = Elections[election_id];
        voterHistory[] memory History = new voterHistory[](
            election.total_ballots
        );

        for (uint256 i = 1; i <= election.total_ballots; i++) {
            if (election.voters[msg.sender].history[i].pool_id == i) {
                History[i - 1] = election.voters[msg.sender].history[i];
            }
        }

        return History;
    }

    function getVoteStatus(
        uint256 election_id
    )
        public
        view
        returns (
          
            address account,
            uint256 weight,
            uint256 totalVoteEvents,
            Party[] memory party_verified,
            bool rightToVote
        )
    // Party[] memory verifiedBy

    {

             require(election_id <= electionID, "Event does not exist");
        require(election_id != 0, "Event does not exist");
        Event storage election = Elections[election_id];
          require(
             election.voters[msg.sender].account == msg.sender,
            "Sorry you are not added to voting list yet, contact your party head"
        );
        address _account = election.voters[msg.sender].account;
        uint256 _weight = election.voters[msg.sender].weight;
        uint256 _totalVoteEvents = election.voters[msg.sender].totalVoteEvents;
        bool _rightToVote= election.voters[msg.sender].rightToVote;
        Party[] memory _party_verified= new Party[](election.voters[msg.sender].authorized_party);
        uint256 party_count;
        if (election.voters[msg.sender].authorized_party > 0) {
            for (uint256 i = 0; i < election.total_parties; i++) {
                if (
                    election.voters[msg.sender].partiesAuthorized[
                        election.parties_address[i]
                    ] == election.parties[election.parties_address[i]].name
                ) {
                    _party_verified[party_count] = Party(
                        election.parties_address[i],
                        election.parties[election.parties_address[i]].name,
                        election.parties[election.parties_address[i]].img_url     
                    );
                    party_count++;
                }
            }
        }

        return (_account, _weight, _totalVoteEvents,_party_verified,_rightToVote);
    }

        function getVoteRight(
        uint256 election_id
    )
        public
        view
        returns (
            bool rightToVote
        )
    // Party[] memory verifiedBy

    {
        Event storage election = Elections[election_id];
          require(
             election.voters[msg.sender].account == msg.sender,
            "Sorry you are not added to voting list yet, contact your party head"
        );
        bool _rightToVote= election.voters[msg.sender].rightToVote;
     
        return (_rightToVote);
    }
}
