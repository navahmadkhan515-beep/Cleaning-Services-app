# TODO: Mobile Nav Spacing & Navigation Fix

## Step 1: Modify `closeMobileNav` to keep header visible

- [x] Change `closeMobileNav` to only `setOpen(false)` without hiding the header

## Step 2: Reduce mobile nav top padding when menu open

- [x] Reduce `<nav>` padding from `py-4` to `py-0 sm:py-4` so brand row is compact on mobile when menu is open
- [x] Reduce dropdown `<div>` padding from `py-4` to `py-2`

## Step 3: Test

- [ ] Verify mobile nav opens with less space from top
- [ ] Verify clicking nav link keeps header visible and content starts right below it
