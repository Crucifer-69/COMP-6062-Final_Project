new Vue({
    el: '#app',
    data: {
        randomFact: '',
        weather: {
            city: 'London, Ontario',
            temperature: '',
            wind: '',
            description: ''
        },
        city: '',
        dictionary: {
            word: '',
            phonetic: '',
            partOfSpeech: '',
            definition: ''
        },
        word: ''
    },
    methods: {
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        getWeather() {
            const city = this.city || 'London, Ontario';
            fetch(`https://goweather.herokuapp.com/weather/${city}`)
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        city: city,
                        temperature: data.temperature,
                        wind: data.wind,
                        description: data.description
                    };
                });
        },
        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    const wordData = data[0];
                    this.dictionary = {
                        word: wordData.word,
                        phonetic: wordData.phonetic,
                        partOfSpeech: wordData.meanings[0].partOfSpeech,
                        definition: wordData.meanings[0].definitions[0].definition
                    };
                });
        }
    },
    mounted() {
        this.getRandomFact();
        this.getWeather();
    }
});
