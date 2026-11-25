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
thumbnail: '../../assets/diagrams/spi-bringup.svg'
thumbnailAlt: 'Diagram of the reset and configuration state machines driving an SPI master connected to the ADC.'
keyFacts:
  - { value: '44', label: 'registers written and read back' }
  - { value: '24-bit', label: 'SPI frames' }
  - { value: '5 MHz', label: 'default SCLK, divided from 416 MHz' }
notice: 'Done during my internship at Indra. Described at the engineering level only; the diagram is my own generic drawing.'
---

## Overview

Before the down-conversion chain can process anything, the high-speed ADC must be
configured. This separate Vivado project brings the ADC up from the FPGA: it resets
the converter, waits until it is ready, and loads its configuration over SPI, checking
every register.

Hardware: TI TSWDC155EVM (Artix-7 XC7A200T-FBG484) connected to a TI ADC evaluation
board over FMC.

## My role

I wrote the SPI master and both control state machines in VHDL, and debugged the
link on the board.

## Design

![Reset and configuration state machines driving a 24-bit SPI master connected to the ADC evaluation board.](../../assets/diagrams/spi-bringup.svg)

- **Reset state machine.** Resets the ADC and polls its "configuration ready" bit.
- **Configuration state machine.** Walks through a table of 44 configuration registers.
  For each one it writes the value, reads it back, compares the result through a
  per-register verification mask, and retries if the check fails.
- **SPI master.** 24-bit frames: R/W bit, 12-bit address, 8-bit data. SCLK is divided
  down from the 416 MHz system clock (5 MHz by default).
- **Robustness details.** A synchroniser on the asynchronous input line, a debounced
  manual reset, a power-on reset, and a differential clock input (IBUFDS + BUFG).

The per-register masks define which bits of each register must read back exactly as
written.

## Testing

I debugged the link with three tools together: VHDL testbenches in simulation, the
Vivado Integrated Logic Analyzer (ILA) inside the FPGA, and an oscilloscope on the SPI
lines.

## Lessons learned

- A read-back check with retries turns "the ADC does not work" into "register N failed",
  which is much faster to debug.
- Every signal that comes from outside the clock domain needs a synchroniser, even a
  slow SPI data line.
