#![no_std]

multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[type_abi]
#[derive(ManagedVecItem, TopEncode, TopDecode, NestedEncode, NestedDecode, Debug)]
pub struct Proposal<M: ManagedTypeApi> {
    pub id: u64,
    pub description: ManagedBuffer<M>,
    pub votes: BigUint<M>,
}

#[multiversx_sc::contract]
pub trait VotingContract {
    #[init]
    fn init(&self) {}

    #[storage_mapper("proposals")]
    fn proposals(&self) -> SingleValueMapper<ManagedVec<Self::Api, Proposal<Self::Api>>>;

    fn get_proposals(&self) -> ManagedVec<Self::Api, Proposal<Self::Api>> {
        if !self.proposals().is_empty() {
            self.proposals().get()
        } else {
            ManagedVec::new()
        }
    }

    #[endpoint]
    fn add_proposal(&self, description: ManagedBuffer<Self::Api>) {
        let mut proposals = self.get_proposals();
        proposals.push(Proposal {
            id: proposals.len() as u64,
            description,
            votes: BigUint::zero(),
        });
        self.proposals().set(proposals);
    }

    #[endpoint]
    fn vote(&self, proposal_id: u64) {
        let mut proposals = self.get_proposals();
        require!(
            proposal_id < proposals.len() as u64,
            "Invalid proposal ID"
        );

        let mut proposal = proposals.get(proposal_id as usize);
        proposal.votes += BigUint::from(1u32);
        _ = proposals.set(proposal_id as usize, proposal);
        self.proposals().set(proposals);
    }

    #[view(getResults)]
    fn get_results(&self) -> ManagedVec<Self::Api, Proposal<Self::Api>> {
        self.get_proposals()
    }
}