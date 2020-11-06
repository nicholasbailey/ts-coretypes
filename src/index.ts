/**
 * Core data types that are common accross applications, but
 * don't have native support in Typescript or Javascript.
 * 
 * One of the consistently frustrating features of the Javascript ecosystem
 * is its use of basic types to represent concepts absent from the language itself. 
 * Because there is no 'standard library' comparable to the the standard libraries of Java,
 * .NET or Python, Javascript developers usually make do with core types rather than adding
 * heavy layers of data types to their libraries which are unlikely to be used by other library maintainers.
 * Examples range from using strings as 'enums' to Javascript's very limited Date type 
 * to using plain strings to represent UUIDs.
 * 
 * Typescript provides us with potential solutions to this problem through the mechanisms of 
 * type aliases, branded types and type predicates. This allows us to define a layer of more specific
 * types on top of the basic Javascript types. Becaues these types ultimately compile to basic types,
 * there's no problem of introducing a type that adopters of our libraries have to use, and we can
 * safely interop with code that assumes we will use the basic types. Because the types are a Typescript
 * layer feature, there's no meaningful performance loss. But because we're enforcing narrower types,
 * we can force developers to think carefully about possible input values and explicitly work around the
 * compiler if they are doing something risky.
 * 
 * Essentially, the goal of coretypes is to take the philosophy Typescript applies to the question
 * of whether a value can be null, and apply it to the question of whether a number can be positive,
 * a Date can represent a day or a timestamp or a string can represent an email address
 */
import { v4 } from 'uuid';

/**
 * A string expected to be non-empty
 * 
 * You can use the isNonEmpty type-guard and asNonEmpty builder to enforce email-ness on a string
 */
export type NonEmptyString = string & { __nonemptystring__: void }

export function isNonEmptyString(x: any): x is NonEmptyString {
    return typeof x === 'string' && x.length > 0
}

export function asNonEmptyString(x: any): NonEmptyString {
    if (isNonEmptyString(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NonEmptyString`)
    }
}

/**
 * A RFC4221 v4 Universally Unique Identifier represented as a branded string
 * 
 * UUIDs are represented as a string of 32 hexadecimal digits with hyphens
 * after the 8th, 12th, 16th, 20th, and 32nd digit. 
 * 
 * You can use the isUUID type-guard to enforce UUID-ness and the asUUID builder
 * to construct UUIDs from strings and the newUUID function to get a new UUID.
 * 
 * Note that Coretypes has no support for other UUID versions, because there's basically
 * no reason to ever use non-random UUIDs.
 */
export type UUID = NonEmptyString & { __uuid__: void }

export function isUUID(x: any): x is UUID {
    return typeof x === 'string' && !!x.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
}

export function asUUID(x: any): UUID {
    if (isUUID(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a UUID`)
    }
}

/**
 * An email address represented as a branded string
 * 
 * You can use the isEmail type-guard and asEmail builder to enforce email-ness on a string
 */
export type Email = NonEmptyString & { __email__: void }


export function isEmail(x: any): x is Email {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return typeof x === 'string' && re.test(x)
}

export function asEmail(x: any): Email {
    if (isEmail(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not an Email`)
    }
}

/**
 * An alias for a nullable type. Options are *not* branded, so you don't need to use them with any
 * coretypes libraries if you don't want to, or if you prefer a different name for nullable values.
 */
export type Option<T> = T | null

/**
 * 
 */
export type Either<T, U> = [T, Option<U>] | [U, Option<T>]

/**
 * An integer represented as a double-precision floating point number. Because Javscript
 * does not provide native integer types, doubles are use instead. Note that you should not
 * assume that integer math can be safely performed on this type, it's still a double under the hood.
 */
export type Int = number & { __int__: void }

export function isInt(x: any): x is Int {
    return typeof x === 'number' && isFinite(x) && Math.round(x) === x
}

export function asInt(x: any): Int {
    if (isInt(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not an Int`)
    }
}


/**
 * A real number greater than zero represented as a double precision floating point number.
 * You should coerce to this type using the isPositiveNumber type guard.
 */
export type PositiveNumber = number & { __positive__: void }

export function isPositiveNumber(x: any): x is PositiveNumber {
    return typeof x === 'number' && isFinite(x) && x > 0
}

export function asPositiveNumber(x: any): PositiveNumber {
    if (isPositiveNumber(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a PositiveNumber`)
    }
}

/**
 * A real number greater than or equal to zero represented as a double-precision floating point number.
 * You should coerce to this type using the isNonNegativeNumber type guard.
 */
export type NonNegativeNumber = number & { __positive__: void } | 0

export function isNonNegativeNumber(x: any): x is NonNegativeNumber {
    return isPositiveNumber(x) || x === 0
}

export function asNonNegativeNumber(x: any): NonNegativeNumber {
    if (isNonNegativeNumber(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NonNegativeNumber`)
    }
}

/**
 * A real number less than zero represented as a doulbe precision floating point number.
 * You should coerce to this type using the isNegativeNumber type guard.
 */
export type NegativeNumber = number & { __negative__: void }

export function isNegativeNumber(x: any): x is NegativeNumber {
    return typeof x === 'number' && isFinite(x) && x < 0
}

export function asNegativeNumber(x: any): NegativeNumber {
    if (isNegativeNumber(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NegativeNumber`)
    }
}

/**
 * An integer greater than or equal to zero
 * The NonNegativeInt type 'implements' the NonNegativeNumber and Int types.
 * You should coerce to this type using the isNonNegativeInt type guard.
 */
export type NonNegativeInt = Int & NonNegativeNumber

export function isNonNegativeInt(x: any): x is NonNegativeNumber {
    return typeof x === 'number' && isFinite(x) && x >= 0 && Math.round(x) === x
}

export function asNonNegativeInt(x: any): NonNegativeNumber {
    if (isNonNegativeInt(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NegativeInt`)
    }
}

/**
 * An integer greater than zero. 
 * The PositiveInt type 'implements' the PositiveNumber and Int types.
 * You should coerce to this type using the isPositiveInt type guard.
 */
export type PositiveInt = Int & PositiveNumber

export function isPositiveInt(x: any): x is PositiveInt {
    return typeof x === 'number' && isFinite(x) && x > 0 && Math.round(x) === x
}

export function asPositiveInt(x: any): PositiveInt {
    if (isPositiveInt(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NegativeInt`)
    }
}


/**
 * An integer less than zero
 * The NegativeInt type 'implements' the NegativeNumber and Int types.
 * You should coerce to this type using the isNegativeInt type guard.
 */
export type NegativeInt = Int & NegativeNumber

export function isNegativeInt(x: any): x is NegativeInt {
    return typeof x === 'number' && isFinite(x) && x < 0 && Math.round(x) === x
}

export function asNegativeInt(x: any): NegativeInt {
    if (isNegativeInt(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a NegativeInt`)
    }
}

export namespace UUIDOps {
    /**
     * Create a new version 4 UUID
     */
    export function newUUID(): UUID {
        return v4() as UUID
    }
}

/**
 * Represents a date, independent of any time or timezone information,
 * as a Javascript Date object.
 * To get a sense of the use cases for this, read up on java.time, JodaTime
 * or NodaTime.
 * 
 * In practice, we enforce 'local date' status by requiring the utcHours, utcMinutes, utcSeconds,
 * utcMilliseconds to all be zero. 
 */
export type LocalDate = Date & {
    __localdate__: void
}

export function isLocalDate(x: any): x is LocalDate {
    return x instanceof Date &&
        x.getUTCHours() === 0 &&
        x.getUTCMinutes() === 0 &&
        x.getUTCSeconds() === 0 &&
        x.getUTCMilliseconds() === 0
}

export function asLocalDate(x: any): LocalDate {
    if (isLocalDate(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a LocalDate`)
    }
}

export type LocalDateTime = Date & {
    __localdatetime__: void
}

export type Instant = Date & { __instant__: void }

export function isInstant(x: any): x is Instant {
    return x instanceof Date
}

export function asInstant(x: any) {
    if (isInstant(x)) {
        return x as Instant
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not an Instant`)
    }
}

export type Duration = NonNegativeInt & { __duration__: void }

export function isDuration(x: any): x is Duration {
    return isNonNegativeInt(x)
}

export function asDuration(x: any) {
    if (isDuration(x)) {
        return x
    } else {
        throw new TypeError(`Value ${x} of type ${typeof x} is not a Duration`)
    }
}

export type ShortTimeUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours'
export type LongTimeUnit = 'days' | 'weeks' | 'months' | 'years'

export namespace DateTimeOps {
    /**
     * Create a new LocalDate from a year month and day
     */
    export function newLocalDate(year: number, month: number, day: number): LocalDate {
        return new Date(Date.UTC(year, month, day, 0, 0, 0, 0)) as LocalDate
    }

    export function now(): Instant {
        return new Date(Date.now()) as Instant
    }

    export function durationOf(amount: number, unit: ShortTimeUnit | 'days' | 'weeks'): Duration {
        if (unit === 'seconds') {
            return amount * 1000 as Duration
        } else if (unit === 'minutes') {
            return amount * 60000 as Duration
        } else if (unit === 'hours') {
            return amount * 3600000 as Duration
        } else if (unit === 'days') {
            return amount * 86400000 as Duration
        } else if (unit === 'weeks') {
            return amount * 604800000 as Duration
        } else {
            return amount as Duration
        }
    }
}
