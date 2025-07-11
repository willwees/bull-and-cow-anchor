use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct BullAndCowGame {
    pub correct_answer: u32,
}