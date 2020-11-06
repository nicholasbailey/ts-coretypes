import {
    Int,
    asInt,
    isInt,
    PositiveNumber,
    asPositiveNumber,
    isPositiveNumber,
    NonNegativeNumber,
    asNonNegativeNumber,
    isNonNegativeNumber,
    NegativeNumber,
    asNegativeNumber,
    isNegativeNumber,
    PositiveInt,
    asPositiveInt,
    isPositiveInt,
    NonNegativeInt,
    isNonNegativeInt,
    asNonNegativeInt,
    NegativeInt,
    isNegativeInt,
    asNegativeInt,
    UUID,
    isUUID,
    asUUID,
    Email,
    isEmail,
    asEmail,
    NonEmptyString,
    isNonEmptyString,
    asNonEmptyString,
    LocalDate,
    asLocalDate,
    isLocalDate,
    DateTimeOps,
    Instant,
    asInstant,
    isInstant,
    asDuration,
    isDuration
} from '../index'

describe('coretypes', () => {
    describe('Ints', () => {
        it('should be numbers', () => {
            const i: number = asInt(10)
        })

        it('should be checkable with isInt', () => {
            // TODO - break this into multiple tests for better reporting
            expect(isInt(1)).toBe(true)
            expect(isInt(0)).toBe(true)
            expect(isInt(-1)).toBe(true)
            expect(isInt(1000)).toBe(true)
            expect(isInt(10.5)).toBe(false)
            expect(isInt('1')).toBe(false)
            expect(isInt('0')).toBe(false)
            expect(isInt(null)).toBe(false)
            expect(isInt(undefined)).toBe(false)
            expect(isInt(true)).toBe(false)
            expect(isInt(false)).toBe(false)
            expect(isInt(Infinity)).toBe(false)
            expect(isInt(NaN)).toBe(false)
        })

        it('should be constructable with asInt', () => {
            expect(asInt(10)).toBe(10 as Int)
            expect(asInt(0)).toBe(0 as Int)
            expect(asInt(-10)).toBe(-10 as Int)
        })

        it('should not be constructable from non-integers types', () => {
            expect(() => asInt(10.5)).toThrow()
            expect(() => asInt('1')).toThrow()
            expect(() => asInt('0')).toThrow()
            expect(() => asInt(null)).toThrow()
            expect(() => asInt(undefined)).toThrow()
            expect(() => asInt(true)).toThrow()
            expect(() => asInt(false)).toThrow()
            expect(() => asInt(Infinity)).toThrow()
            expect(() => asInt(NaN)).toThrow()
        })
    })

    describe('PositiveNumbers', () => {
        it('should be  numbers', () => {
            const n: number = asPositiveNumber(10.234)
        })

        it('should be checkable with isPositiveNumber', () => {
            expect(isPositiveNumber(1)).toBe(true)
            expect(isPositiveNumber(10.3214)).toBe(true)
            expect(isPositiveNumber(0)).toBe(false)
            expect(isPositiveNumber(-1)).toBe(false)
            expect(isPositiveNumber(-10.3214)).toBe(false)
            expect(isPositiveNumber('1')).toBe(false)
            expect(isPositiveNumber(null)).toBe(false)
            expect(isPositiveNumber(undefined)).toBe(false)
            expect(isPositiveNumber(Infinity)).toBe(false)
            expect(isPositiveNumber(-Infinity)).toBe(false)
            expect(isPositiveNumber(NaN)).toBe(false)
            expect(isPositiveNumber(-0)).toBe(false)
        })

        it('should be constructable with asPositiveNumber', () => {
            expect(asPositiveNumber(1)).toBe(1 as PositiveNumber)
            expect(asPositiveNumber(2.315463)).toBe(2.315463 as PositiveNumber)
        })

        it('should not be constructable from things that are not positive numbers', () => {
            expect(() => asPositiveNumber(0)).toThrow()
            expect(() => asPositiveNumber(-1)).toThrow()
            expect(() => asPositiveNumber(-10.3214)).toThrow()
            expect(() => asPositiveNumber('1')).toThrow()
            expect(() => asPositiveNumber(null)).toThrow()
            expect(() => asPositiveNumber(undefined)).toThrow()
            expect(() => asPositiveNumber(Infinity)).toThrow()
            expect(() => asPositiveNumber(-Infinity)).toThrow()
            expect(() => asPositiveNumber(NaN)).toThrow()
            expect(() => asPositiveNumber(-0)).toThrow()
        })

        it('should be a non negative number', () => {
            const n: NonNegativeNumber = asPositiveNumber(1)
        })
    })

    describe('NonNegativeNumbers', () => {
        it('should be a number', () => {
            const n: number = asNonNegativeNumber(0)
        })

        it('should be checkable with isNonNegativeNumber', () => {
            expect(isNonNegativeNumber(1)).toBe(true)
            expect(isNonNegativeNumber(1.2342)).toBe(true)
            expect(isNonNegativeNumber(0)).toBe(true)
            expect(isNonNegativeNumber('1')).toBe(false)
            expect(isNonNegativeNumber(-1)).toBe(false)
            expect(isNonNegativeNumber(-1.2342)).toBe(false)
            expect(isNonNegativeNumber(Infinity)).toBe(false)
            expect(isNonNegativeNumber(-Infinity)).toBe(false)
            expect(isNonNegativeNumber(NaN)).toBe(false)
            expect(isNonNegativeNumber(null)).toBe(false)
            expect(isNonNegativeNumber(undefined)).toBe(false)
        })

        it('should be constructable with asNonNegativeNumber', () => {
            expect(asNonNegativeNumber(1)).toBe(1 as NonNegativeNumber)
            expect(asNonNegativeNumber(1.2342)).toBe(1.2342 as NonNegativeNumber)
            expect(asNonNegativeNumber(0)).toBe(0 as NonNegativeNumber)
        })

        it('should be not be constractable fron invalid fields', () => {
            expect(() => asNonNegativeNumber('1')).toThrow()
            expect(() => asNonNegativeNumber(-1)).toThrow()
            expect(() => asNonNegativeNumber(-1.2342)).toThrow()
            expect(() => asNonNegativeNumber(Infinity)).toThrow()
            expect(() => asNonNegativeNumber(-Infinity)).toThrow()
            expect(() => asNonNegativeNumber(NaN)).toThrow()
            expect(() => asNonNegativeNumber(null)).toThrow()
            expect(() => asNonNegativeNumber(undefined)).toThrow()
        })
    })

    describe('NegativeNumbers', () => {
        it('should be a number ', () => {
            const n: number = asNegativeNumber(-2)
        })

        it('should be oheckable with isNegativeNumber', () => {
            expect(isNegativeNumber(-1)).toBe(true)
            expect(isNegativeNumber(-2.341)).toBe(true)
            expect(isNegativeNumber(1)).toBe(false)
            expect(isNegativeNumber(48102.42)).toBe(false)
            expect(isNegativeNumber(0)).toBe(false)
            expect(isNegativeNumber('-23')).toBe(false)
            expect(isNegativeNumber(undefined)).toBe(false)
            expect(isNegativeNumber(null)).toBe(false)
            expect(isNegativeNumber(Infinity)).toBe(false)
            expect(isNegativeNumber(-Infinity)).toBe(false)
            expect(isNegativeNumber(NaN)).toBe(false)
        })

        it('should be constructable with asNegativeNumber', () => {
            expect(asNegativeNumber(-1)).toBe(-1 as NegativeNumber)
            expect(asNegativeNumber(-2.341)).toBe(-2.341 as NegativeNumber)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asNegativeNumber(1)).toThrow()
            expect(() => asNegativeNumber(48102.42)).toThrow()
            expect(() => asNegativeNumber(0)).toThrow()
            expect(() => asNegativeNumber("-23")).toThrow()
            expect(() => asNegativeNumber(undefined)).toThrow()
            expect(() => asNegativeNumber(null)).toThrow()
            expect(() => asNegativeNumber(Infinity)).toThrow()
            expect(() => asNegativeNumber(-Infinity)).toThrow()
            expect(() => asNegativeNumber(NaN)).toThrow()
        })
    })

    describe('PositiveInts', () => {
        it('should be numbers', () => {
            const n: number = asPositiveInt(10)
        })

        it('should be checkable with isPositiveInt', () => {
            expect(isPositiveInt(1)).toBe(true)
            expect(isPositiveInt(11)).toBe(true)
            expect(isPositiveInt(11.1)).toBe(false)
            expect(isPositiveInt(0)).toBe(false)
            expect(isPositiveInt(-1)).toBe(false)
            expect(isPositiveInt(12412.152)).toBe(false)
            expect(isPositiveInt(Infinity)).toBe(false)
            expect(isPositiveInt(-Infinity)).toBe(false)
            expect(isPositiveInt(null)).toBe(false)
            expect(isPositiveInt(undefined)).toBe(false)
            expect(isPositiveInt(NaN)).toBe(false)
        })

        it('should be constructable with asPositiveInt', () => {
            expect(asPositiveInt(1)).toBe(1 as PositiveInt)
            expect(asPositiveInt(11)).toBe(11 as PositiveInt)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asPositiveInt("1")).toThrow()
            expect(() => asPositiveInt(11.1)).toThrow()
            expect(() => asPositiveInt(0)).toThrow()
            expect(() => asPositiveInt(-1)).toThrow()
            expect(() => asPositiveInt(12412.152)).toThrow()
            expect(() => asPositiveInt(Infinity)).toThrow()
            expect(() => asPositiveInt(-Infinity)).toThrow()
            expect(() => asPositiveInt(null)).toThrow()
            expect(() => asPositiveInt(undefined)).toThrow()
            expect(() => asPositiveInt(NaN)).toThrow()
        })

        it('should be Ints', () => {
            const n: Int = asPositiveInt(2)
        })

        it('should be PositiveNumbers', () => {
            const n: PositiveNumber = asPositiveInt(2)
        })
    })

    describe('NonNegativeInts', () => {

        it('should be a number', () => {
            const n: number = asNonNegativeInt(0)
        })

        it('should be checkable with isNonNegativeInt', () => {
            expect(isNonNegativeInt(11)).toBe(true)
            expect(isNonNegativeInt(2)).toBe(true)
            expect(isNonNegativeInt(0)).toBe(true)
            expect(isNonNegativeInt("1")).toBe(false)
            expect(isNonNegativeInt(11.1)).toBe(false)
            expect(isNonNegativeInt(-1)).toBe(false)
            expect(isNonNegativeInt(Infinity)).toBe(false)
            expect(isNonNegativeInt(-Infinity)).toBe(false)
            expect(isNonNegativeInt(null)).toBe(false)
            expect(isNonNegativeInt(undefined)).toBe(false)
            expect(isNonNegativeInt(NaN)).toBe(false)
        })

        it('should be constructable with asNonNegativeInt', () => {
            expect(asNonNegativeInt(2)).toBe(2 as NonNegativeInt)
            expect(asNonNegativeInt(0)).toBe(0 as NonNegativeInt)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asNonNegativeInt("-1")).toThrow()
            expect(() => asNonNegativeInt(11.1)).toThrow()
            expect(() => asNonNegativeInt(-1)).toThrow()
            expect(() => asNonNegativeInt(12412.152)).toThrow()
            expect(() => asNonNegativeInt(Infinity)).toThrow()
            expect(() => asNonNegativeInt(-Infinity)).toThrow()
            expect(() => asNonNegativeInt(null)).toThrow()
            expect(() => asNonNegativeInt(undefined)).toThrow()
            expect(() => asNonNegativeInt(NaN)).toThrow()
        })
    })

    describe('NegativeInts', () => {
        it('should be checkable with isNegativeInt', () => {
            expect(isNegativeInt(-1)).toBe(true)
            expect(isNegativeInt(0)).toBe(false)
            expect(isNegativeInt(1)).toBe(false)
            expect(isNegativeInt(-1.2)).toBe(false)
            expect(isNegativeInt(1241)).toBe(false)
            expect(isNegativeInt(Infinity)).toBe(false)
            expect(isNegativeInt(-Infinity)).toBe(false)
            expect(isNegativeInt(null)).toBe(false)
            expect(isNegativeInt(undefined)).toBe(false)
            expect(isNegativeInt(NaN)).toBe(false)
        })

        it('should be constructable with asNegativeInt', () => {
            expect(asNegativeInt(-12)).toBe(-12 as NegativeInt)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asNegativeInt(0)).toThrow()
            expect(() => asNegativeInt(1)).toThrow()
            expect(() => asNegativeInt(-1.2)).toThrow()
            expect(() => asNegativeInt(1241)).toThrow()
            expect(() => asNegativeInt(Infinity)).toThrow()
            expect(() => asNegativeInt(-Infinity)).toThrow()
            expect(() => asNegativeInt(null)).toThrow()
            expect(() => asNegativeInt(undefined)).toThrow()
            expect(() => asNegativeInt(NaN)).toThrow()
        })

        it('should be NegativeNumbers', () => {
            const n: NegativeNumber = asNegativeInt(-1)
        })

        it('should be Ints', () => {
            const n: Int = asNegativeInt(-1)
        })
    })

    describe('PositiveInts', () => {
        it('should be checkable with isPositiveInt', () => {
            expect(isPositiveInt(1)).toBe(true)
            expect(isPositiveInt(0)).toBe(false)
            expect(isPositiveInt("1")).toBe(false)
            expect(isPositiveInt(11.1)).toBe(false)
            expect(isPositiveInt(-1)).toBe(false)
            expect(isPositiveInt(Infinity)).toBe(false)
            expect(isPositiveInt(-Infinity)).toBe(false)
            expect(isPositiveInt(null)).toBe(false)
            expect(isPositiveInt(undefined)).toBe(false)
            expect(isPositiveInt(NaN)).toBe(false)
        })


        it('should be constructable with asPositiveInt', () => {
            expect(asPositiveInt(1)).toBe(1 as PositiveInt)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asPositiveInt("1")).toThrow()
            expect(() => asPositiveInt(11.1)).toThrow()
            expect(() => asPositiveInt(-1)).toThrow()
            expect(() => asPositiveInt(Infinity)).toThrow()
            expect(() => asPositiveInt(-Infinity)).toThrow()
            expect(() => asPositiveInt(null)).toThrow()
            expect(() => asPositiveInt(undefined)).toThrow()
            expect(() => asPositiveInt(NaN)).toThrow()
        })

        it('should be numbers', () => {
            const n: number = 1 as PositiveInt
        })

        it('should be Ints', () => {
            const n: number = 1 as Int
        })

        it('should be PositiveNumbers', () => {
            const n: number = 1 as PositiveNumber
        })
    })

    describe('UUIDs', () => {
        it('should be strings', () => {
            expect(typeof asUUID('91a495f8-86a3-453a-aa10-1d50a45c95f9')).toBe('string')
        })

        it('should be checkable with isUUID', () => {
            expect(isUUID('91a495f8-86a3-453a-aa10-1d50a45c95f9')).toBe(true)
            expect(isUUID('91a495f8-86a3-153a-aa10-1d50a45c95f9')).toBe(false)
            expect(isUUID('91a495f886a3453aaa101d50a45c95f9')).toBe(false)
            expect(isUUID('-sd')).toBe(false)
        })

        it('should be constructable with asUUID', () => {
            expect(asUUID('91a495f8-86a3-453a-aa10-1d50a45c95f9')).toBe('91a495f8-86a3-453a-aa10-1d50a45c95f9' as UUID)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asUUID('91a495f8-86a3-153a-aa10-1d50a45c95f9')).toThrow()
            expect(() => asUUID('91a495f886a3453aaa101d50a45c95f9')).toThrow()
            expect(() => asUUID('-sd')).toThrow()
        })

        it('should be NonEmptyStrings', () => {
            const x: NonEmptyString = asUUID('91a495f8-86a3-453a-aa10-1d50a45c95f9')
        })
    })

    describe('Emails', () => {
        it('should be strings', () => {
            expect(typeof asEmail('nicklbailey@gmail.com')).toBe('string')
        })

        it('should be checkable with isEmail', () => {
            expect(isEmail('paulhollywood@gmail.com')).toBe(true)
            expect(isEmail('paul.hollyword@gmail.com')).toBe(true)
            expect(isEmail('cool_katz1@gmail.com')).toBe(true)
            expect(isEmail('cool_katz1@gmail')).toBe(false)
            expect(isEmail('')).toBe(false)
            expect(isEmail(null)).toBe(false)
            expect(isEmail(undefined)).toBe(false)
        })

        it('should be constructable with asEmail', () => {
            expect(asEmail('aethelred@gmail.com')).toBe('aethelred@gmail.com' as Email)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asEmail(() => 'aethelred@gmail')).toThrow()
            expect(() => asEmail('rutabega')).toThrow()
            expect(() => asEmail('aethelred.com')).toThrow()
        })

        it('should be NonEmptyStrings', () => {
            const x: NonEmptyString = asEmail('aethelred@gmail.com')
        })
    })

    describe('NonEmptyStrings', () => {
        it('should be a string', () => {
            expect(typeof asNonEmptyString('hello')).toBe('string')
        })

        it('should be checkable with isNonEmptyString', () => {
            expect(isNonEmptyString('allo')).toBe(true)
            expect(isNonEmptyString('')).toBe(false)
        })

        it('should be constructable with asNonEmptyString', () => {
            expect(asNonEmptyString('YipeeKaiYai')).toBe('YipeeKaiYai' as NonEmptyString)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asNonEmptyString('')).toThrow()
            expect(() => asNonEmptyString([])).toThrow()
            expect(() => asNonEmptyString(null)).toThrow()
            expect(() => asNonEmptyString(undefined)).toThrow()
        })
    })

    describe('LocalDates', () => {
        it('should be Dates', () => {
            const x: Date = asLocalDate(new Date(Date.UTC(2000, 10, 22)))
            expect(x instanceof Date)
        })

        it('should be checkable with isLocalDate', () => {
            expect(isLocalDate(new Date(Date.UTC(2000, 10, 22)))).toBe(true)
            expect(isLocalDate(new Date(Date.UTC(2000, 10, 22, 22)))).toBe(false)
            expect(isLocalDate(Date.UTC(2000, 22, 10))).toBe(false)
            expect(isLocalDate('2020-10-12')).toBe(false)
        })

        it('should be constructable with asLocalDate', () => {
            expect(asLocalDate(new Date(Date.UTC(2000, 10, 22)))).toEqual(new Date(Date.UTC(2000, 10, 22)) as LocalDate)
        })

        it('should not be constuctible with invalid values', () => {
            expect(() => asLocalDate(new Date(Date.UTC(2000, 10, 22, 22)))).toThrow()
            expect(() => asLocalDate(Date.UTC(2000, 22, 10))).toThrow()
            expect(() => asLocalDate('2020-10-12')).toThrow()
        })
    })

    describe('DateTimeOps', () => {
        describe('newLocalDate', () => {
            it('should construct valid dates', () => {
                const aDate = DateTimeOps.newLocalDate(asPositiveInt(2020), asPositiveInt(3), asPositiveInt(4))
                expect(aDate).toEqual(asLocalDate(new Date(Date.UTC(2020, 3, 4))))
            })
        })

        describe('durationOf', () => {

            it('should construct a duration of weeks', () => {
                const x = DateTimeOps.durationOf(10, 'weeks')
                expect(x).toEqual(7 * 24 * 10 * 60 * 60 * 1000)
            })

            it('should construct a duration of days', () => {
                const x = DateTimeOps.durationOf(10, 'days')
                expect(x).toEqual(24 * 10 * 60 * 60 * 1000)
            })

            it('should construct a duration of hours', () => {
                const x = DateTimeOps.durationOf(10, 'hours')
                expect(x).toEqual(10 * 60 * 60 * 1000)
            })

            it('should construct a duration of minutes', () => {
                const x = DateTimeOps.durationOf(10, 'minutes')
                expect(x).toEqual(600000)
            })


            it('should construct a duration of seconds', () => {
                const x = DateTimeOps.durationOf(10, 'seconds')
                expect(x).toEqual(10000)
            })
        })
    })

    describe('Instants', () => {
        it('should be Dates', () => {
            const inst: Date = asInstant(new Date(Date.UTC(2000, 10, 22, 22)))
        })

        it('should be checkable with isInstant', () => {
            expect(isInstant(new Date())).toBe(true)
            expect(isInstant(103)).toBe(false)
            expect(isInstant('2010-11-12T13:14:15Z')).toBe(false)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asInstant('2010-11-12T13:14:15Z')).toThrow()
            expect(() => asInstant(123)).toThrow()
        })
    })

    describe('Durations', () => {
        it('should be NonNegativeInts', () => {
            const x: NonNegativeInt = DateTimeOps.durationOf(10, 'seconds')
        })

        it('should be checkable with isDuration', () => {
            expect(isDuration(10)).toBe(true)
            expect(isDuration(-10)).toBe(false)
        })

        it('should be constructable with asDuration', () => {
            expect(asDuration(10)).toEqual(10)
            expect(asDuration(0)).toEqual(0)
        })

        it('should not be constructable with invalid values', () => {
            expect(() => asDuration(-1)).toThrow()
        })
    })
})