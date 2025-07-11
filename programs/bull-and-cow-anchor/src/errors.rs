use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Jawaban lebih tinggi dari input")]
    GuessTooLow,
    #[msg("Jawaban lebih rendah dari input")]
    GuessTooHigh,
}