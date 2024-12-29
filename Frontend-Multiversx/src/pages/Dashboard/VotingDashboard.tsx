import React, { useEffect, useState } from 'react';
import { useAddProposal } from 'hooks/transactions/useAddProposal';
import { useVote } from 'hooks/transactions/useVote';
import { useGetResults } from 'hooks/transactions/useGetResults';

export const VotingDashboard = () => {
  const addProposal = useAddProposal();
  const vote = useVote();
  const getResults = useGetResults();

  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState('');

  const fetchProposals = async () => {
    const results = await getResults();
    setProposals(results || []);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleAddProposal = async () => {
    if (!newProposal.trim()) return;

    try {
      await addProposal(newProposal);
      setNewProposal('');
      fetchProposals();
    } catch (error) {
      console.error('Error adding proposal:', error);
    }
  };

  const handleVote = async (proposalId) => {
    try {
      await vote(proposalId);
      fetchProposals();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Voting Dashboard
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            placeholder="Enter your proposal description"
            style={{ flexGrow: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button
            onClick={handleAddProposal}
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Proposal
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{proposal.description}</h3>
                <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>Total Votes: {proposal.votes}</p>
              </div>
              <button
                onClick={() => handleVote(proposal.id)}
                style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Vote
              </button>
            </div>
          </div>
        ))}

        {proposals.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', color: '#555' }}>
            No proposals yet. Be the first to add one!
          </div>
        )}
      </div>
    </div>
  );
}