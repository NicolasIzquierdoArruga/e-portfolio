---
title: 'High-speed ADC bring-up over SPI on Artix-7'
summary: 'VHDL SPI master and two state machines that reset a TI high-speed ADC, then write and read back 44 configuration registers with verification and retries.'
context: 'Internship · Indra, Air Defence'
period: 'Apr 2026 – Aug 2026'
date: 2026-08-30
status: completed
featured: true
order: 2
tags: ['FPGA', 'VHDL', 'SPI', 'Board bring-up', 'Vivado ILA']
thumbnail: '../../assets/projects/adc-spi/spi-boards.jpg'
thumbnailAlt: 'The red TI ADC evaluation board connected over FMC to the green Artix-7 FPGA board, with a JTAG programmer attached.'
keyFacts:
  - { value: '44', label: 'registers written and read back' }
  - { value: '24-bit', label: 'SPI frames' }
  - { value: '5 MHz', label: 'default SCLK, divided from 416 MHz' }
notice: 'Done during my internship at Indra. Described at the engineering level only. The diagram is my own drawing, and screens and labels in the lab photo are blurred on purpose.'
gallery:
  - src: '../../assets/projects/adc-spi/spi-setup.jpg'
    alt: 'Lab bench: oscilloscope probing the SPI lines, an RF signal generator providing the ADC clock, and the two evaluation boards on anti-static foam.'
    caption: 'The bench: oscilloscope on the SPI lines, signal generator for the ADC clock, and the boards on anti-static foam.'
  - src: '../../assets/projects/adc-spi/spi-boards.jpg'
    alt: 'Top view of the TI ADC evaluation board and the TSWDC155EVM FPGA board joined by the FMC connector, with the JTAG programmer plugged in.'
    caption: 'ADC evaluation board (red) and Artix-7 board (green), joined over FMC, programmed through JTAG.'
---

## Overview

Before the down-conversion chain can process anything, the high-speed ADC must be
configured. This separate Vivado project brings the ADC up from the FPGA: it resets
the converter, waits until it is ready, and loads its configuration over SPI, checking
every register.

Hardware: TI TSWDC155EVM (Artix-7 XC7A200T-FBG484) connected to a TI ADC evaluation
board over FMC. The ADC clock comes from an RF signal generator through an SMA cable.

![The two evaluation boards on anti-static foam: TI ADC board in red, Artix-7 FPGA board in green, joined by the FMC connector, with the JTAG programmer attached.](../../assets/projects/adc-spi/spi-boards.jpg)

## My role

I wrote the SPI master and both control state machines in VHDL, and debugged the
link on the board.

## Design

![Reset and configuration state machines driving a 24-bit SPI master connected to the ADC evaluation board.](../../assets/diagrams/spi-bringup.svg)

- **Reset state machine.** Resets the ADC and polls its "configuration ready" bit.
- **Configuration state machine.** Walks through a table of 44 configuration registers.
  For each one it writes the value, reads it back, compares the result through a
  per-register verification mask, and retries if the check fails.
- **SPI master.** 24-bit frames: R/W bit, 3 zero bits, 12-bit address, 8-bit data.
  SCLK is divided down from the 416 MHz system clock (5 MHz by default).
- **Robustness details.** A synchroniser on the asynchronous input line, a debounced
  manual reset, a power-on reset, and a differential clock input (IBUFDS + BUFG).

The per-register masks define which bits of each register must read back exactly as
written.

## Testing

I tested each module with its own VHDL testbench first, then on the board with two
tools together: the Vivado Integrated Logic Analyzer (ILA) inside the FPGA, and an
oscilloscope on the SPI lines.

![Oscilloscope screen with four SPI-related traces; the frequency readout on the purple clock trace shows 4.994 MHz.](../../assets/projects/adc-spi/spi-scope.jpg)

*SPI traffic on the oscilloscope at 1 µs/div. The purple trace is SCLK; the readout shows
4.994 MHz for the 5 MHz setting. (Photo of the screen, contrast and sharpness enhanced.)*

## Lessons learned

- A read-back check with retries turns "the ADC does not work" into "register N failed",
  which is much faster to debug.
- Every signal that comes from outside the clock domain needs a synchroniser, even a
  slow SPI data line.
