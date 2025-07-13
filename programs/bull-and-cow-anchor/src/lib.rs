use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("CQZ9xwTgk6nrK2frhgn43J4sXC7xYSuTSMphFbdLer9r");

#[program]
pub mod bull_and_cow_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_game(ctx: Context<CreateGame>, number: u32) -> Result<()> {
        create_game::create_game(ctx, number)
    }

    pub fn bull_and_cow_guess(ctx: Context<BullAndCowGuess>, guess: u32) -> Result<()> {
        bull_and_cow_guess::bull_and_cow_guess(ctx, guess)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
