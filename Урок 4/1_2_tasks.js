class QuoteDetector {
    constructor() {
        this.sentences = [
            `'Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.' -Steve Jobs`,
            `'If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.' -Oprah Winfrey`,
            `'If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.' -James Cameron`,
            `'Life is what happens when you're busy making other plans.' -John Lennon`
        ];

        this.singleQuoteMarks = /(\B\')|(\'\B)/g;
    }

    changeMarks() {
        let newArr = []
        this.sentences.forEach(sentence => {
            newArr.push(sentence.replace(this.singleQuoteMarks, '"'));
        });
        console.log(newArr);
    }
}

const quoteApp = new QuoteDetector;
quoteApp.changeMarks();