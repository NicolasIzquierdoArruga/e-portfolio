---
# ---------------------------------------------------------------------------
# PROJECT TEMPLATE
# 1. Copy this file and rename it, e.g. "motor-driver.md". The file name becomes
#    the address of the page: /projects/motor-driver/
# 2. Remove the "_" : files starting with "_" are ignored by the site.
# 3. Fill in the fields. Fields marked (optional) can be deleted.
# 4. Put the images in src/assets/projects/<project-name>/ and point to them
#    with a relative path like the examples below.
# ---------------------------------------------------------------------------

title: 'Project title'
summary: 'One line that says what it is and the main result, with a number if possible.'
context: 'University project · ENSEEIHT'      # where / for whom
period: 'Jan 2027 – Mar 2027'                 # shown on the page
date: 2027-03-31                              # used for sorting (end date)
status: completed                             # completed | in-progress
featured: false                               # true = shown on the home page
order: 50                                     # lower = shown first
tags: ['FPGA', 'VHDL']

# (optional) card thumbnail, also shown at the top of the page
# thumbnail: '../../assets/projects/my-project/cover.jpg'
# thumbnailAlt: 'Describe the image for screen readers'

# (optional) big numbers shown at the top
keyFacts:
  - { value: '100 MHz', label: 'clock' }

# (optional) a warning box, e.g. for work under NDA
# notice: 'Described at a high level only.'

# (optional) links
links:
  - { label: 'Code on GitHub', url: 'https://github.com/NicolasIzquierdoArruga/...' }

# (optional) gallery with click-to-enlarge
# gallery:
#   - { src: '../../assets/projects/my-project/board.jpg', alt: 'The assembled board', caption: 'Rev A board' }
#   - { src: '../../assets/projects/my-project/scope.png', alt: 'Oscilloscope capture of the SPI clock' }

# (optional) videos: a YouTube id, or an MP4 file placed in public/videos/
# videos:
#   - { title: 'Demo', youtube: 'VIDEO_ID' }
#   - { title: 'Bench test', file: 'videos/bench-test.mp4' }

# (optional) interactive KiCad viewer: files placed in public/kicad/
# kicad:
#   - { title: 'Main board schematic', file: 'kicad/my-board.kicad_sch' }
---

<!-- Every section is optional: delete the ones that do not apply. -->

## Overview

What the project is and the problem it solves.

## My role

What I personally did (and what others did).

## Hardware

Schematics, PCB, photos of the real hardware.

![Describe the image](../../assets/projects/my-project/board.jpg)

## Firmware / software

What the code does, plus a link to the repository. Code blocks are highlighted:

```vhdl
process (clk)
begin
  if rising_edge(clk) then
    q <= d;
  end if;
end process;
```

## Testing and results

Measurements, oscilloscope captures, test data. Tables work:

| Test | Result |
| --- | --- |
| Max clock | 100 MHz |

## Design decisions and lessons learned

Trade-offs, what went wrong and how I fixed it.
