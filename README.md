# Coretypes - Everyday Typescript Data Types

## Why this library

Javascript is a minialist language. It has no standard library. ES6 only includes about 50 types as part of its specification, most of which are pretty obscure object types like `Uint32Array`. Typescript adds another 16 utility types. By contrast, the Java SE runtime has thousands of classes and other runtimes like Python or the CLR are similarly extensive. 

One side effect of this minimalism is that Javascript and Typescript developers mostly make do with a small number of primitive types to represent data. One `number` type represents integers and decimals. Strings are often used to represent flags. Specialized structures like UUIDs and URLs are just represented by strings. For the most part this is a good thing. It leads to concise code, easy serialization and less Java-style proliferation of classes. But it has issues. 

## Design

The goal of coretypes is to force you to think about typing and validity, even when you are using primitive types to represent data.

## Installation
```
# NPM
npm install ts-coretypes

# YARN
yarn add ts-coretypes
```

## Types
### Table of Contents
#### Numeric Types
- [`Int`](#int)
- [`PositiveNumber`](#positivenumber)
- [`NegativeNumber`](#negativenumber)
- [`NonNegativeNumber`](#nonnegativenumber)
- [`PositiveInt`](#positiveint)
- [`NegativeInt`](#negativeint)
- [`NonNegativeInt`](#nonnegativeint)

#### String Types
- [`UUID`](#uuid)
- [`NonEmptyString`](#nonemptystring)
- [`Url`](#url)
- [`Email`](#email)

#### Date and Time Types
- [`LocalDate`](#localdate)
- [`LocalDateTime`](#localdatetime)
- [`LocalTime`](#localtime)
- [`Instant`](#instant)
- [`Duration`](#duration)
- [`Period`](#period)

### Array Types
- [`NonEmptyArray`](#nonemptyarray)


### `Int`

Type representing an Integer. Implemented as a branded type of `number`.

As with all Coretypes branded types, there is no compile-time guarentee that an `Int` is valid. To ensure that an `Int` is valid you can use the `asInt` and `isInt` utility functions, which will fail at runtime rather than allowing an invalid cast.

Note that because of Javascript's double precision floating point number representation, addition and multiplication on integer operations are safe between values of -(2^52 - 1) and 2^53 + 1.

*Usage:*

```typescript
import { Int, asInt } from 'ts-coretypes'

const i: Int = asInt(10)
const n: number = 10

function doubleANumber(x: number): number {
    return x + x
}

function doubleAnInt(x: Int): Int {
    return x + x as Int
}

// works
doubleANumber(i)
doubleAnInt(i)
doubleANumber(n)

// Will not compile
doubleAnInt(n)
```

### `PositiveNumber`

Type representing a positive real number. Implemented as a branded type of `number`. 

As with all Coretypes branded types, there is no compile-time guarentee that an `PositiveNumber` is valid. To ensure that a `PositiveNumber` is valid you can use the `asPositive` and `isPositive` utility functions, which will fail at runtime rather than allowing an invalid cast.

*Usage:*

```typescript
import { PositiveNumber, asPositiveNumber } from 'ts-coretypes'
const p: PositiveNumber = asPositiveNumber(10.4)
const n: number = 10.4

function doubleANumber(x: number): number {
    return x + x
}

function doubleAPositiveNumber(x: PositiveNumber): PositiveNumber {
    return x + x as PositiveNumber
}

// works
doubleANumber(p)
doubleAPositiveNumber(ip
doubleANumber(n)

// Will not compile
doubleAPositiveNumber(n)

```

### `NegativeNumber`

### `NonNegativeNumber`

### `PositiveInt`

### `NegativeInt`

### `NonNegativeInt`

### `UUID`

### `NonEmptyString`