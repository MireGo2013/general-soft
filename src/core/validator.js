export class Validator {
    static required(value = '') {
        return value && value.trim();
    }

    static isEmailValid(value = '') {
        const array = value.trim().split('');
        for (let i = 0; i < array.length; i++) {
            if (array[i] === ' ') return false;
        }
        if (!value.includes('@')) return false;

        return value.trim();
    }

    static isPasswordValid(value = '') {
        const counter = {
            letter: 0,
            digit: 0,
            uppercaseLetter: 0,
        };

        const array = value.split('');
        array.forEach((symbol) => {
            if (typeof symbol === 'string' && !isFinite(symbol)) {
                counter.letter++;
            }
            if (isFinite(symbol)) {
                if (symbol !== ' ') {
                    counter.digit++;
                }
            }
            if (!isFinite(symbol) && symbol === symbol.toUpperCase()) {
                counter.uppercaseLetter++;
            }
        });

        for (let key in counter) {
            if (counter[key] === 0) return false;
        }
        return value;
    }
}
