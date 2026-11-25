---
title: 'NASDAQ ITCH 5.0 market-data parser'
summary: 'In progress. A parser for NASDAQ TotalView-ITCH 5.0 binary market data that decodes order messages field by field from the raw byte stream.'
context: 'Personal project · high-frequency trading'
period: 'Nov 2026 – present'
date: 2026-11-17
status: in-progress
featured: false
order: 11
tags: ['C++', 'Market data', 'ITCH 5.0', 'Binary protocols']
thumbnail: '../../assets/diagrams/itch-message.svg'
thumbnailAlt: 'Byte layout of an ITCH 5.0 Add Order message.'
keyFacts:
  - { value: '4', label: 'order message types decoded (A, E, X, D)' }
  - { value: '36 bytes', label: 'Add Order message body' }
links:
  - { label: 'Code on GitHub', url: 'https://github.com/NicolasIzquierdoArruga/HFT' }
---

## Overview

Trading firms receive exchange data as a stream of small binary messages, and the
first step in a trading system is to decode them. NASDAQ publishes its full order book
feed, TotalView-ITCH 5.0, with a public specification and historical sample files.

This project is a parser for that format. It reads an ITCH 5.0 binary file and decodes
the messages that change the order book.

**This project is in progress.** The page shows what exists in the repository today.

## How the format works

![Byte layout of an ITCH 5.0 Add Order message: 2-byte length, then type, stock locate, tracking number, 6-byte timestamp, order reference, side, shares, stock and price.](../../assets/diagrams/itch-message.svg)

Each message starts with a 2-byte big-endian length, followed by a body whose first byte
is the message type. All fields are fixed-width and big-endian, and the timestamp is
6 bytes (nanoseconds since midnight).

## What the parser does today

- Reads the file message by message using the length prefix.
- Decodes four order messages field by field: **Add Order (A)**, **Order Executed (E)**,
  **Order Cancel (X)** and **Order Delete (D)**. They share the same header (type, stock
  locate, tracking number, timestamp, order reference), then each adds its own fields.
- Skips every other message type using its length, without decoding it.
- Reads multi-byte fields with small big-endian helpers for 2, 4, 6 and 8 bytes.
- Keeps the message layout (field lengths per type) in one header file, grouped by
  message type, instead of numbers scattered in the code.
- Tells a clean end of file apart from a truncated last message or an I/O error, and
  reports how many messages were parsed and skipped.

```cpp
// 6 bytes, big-endian (the ITCH timestamp)
inline uint64_t read_be48(const uint8_t* p) {
    return (uint64_t(p[0]) << 40) | (uint64_t(p[1]) << 32) | (uint64_t(p[2]) << 24) |
           (uint64_t(p[3]) << 16) | (uint64_t(p[4]) << 8)  |  uint64_t(p[5]);
}
```

## Next steps

The software parser is the first stage. The plan from here:

1. **FPGA version.** Implement the parser on an FPGA.
2. **Validation with cocotb.** Verify the FPGA parser with a cocotb testbench.

Nothing of this is built yet. I will add it to this page as it happens.

## Project log

New entries go at the top.

### November 2026

- Added the ITCH 5.0 specification to the repository and set up the project.
- Wrote the big-endian helpers and the message structure.
- Decoding of Add, Execute, Cancel and Delete messages running. The data file path is
  passed on the command line; the large market data files are kept out of the repository.
