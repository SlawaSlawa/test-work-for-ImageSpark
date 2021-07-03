const SearchApp = {
    data() {
        return {
            title: 'Поиск пользователей',
            inputValue: '',
            URL: 'https://api.github.com/search/users?q=',
            countUsers: 0,
            users: [],
            filter: 'возрастание'
        }
    },
    methods: {
        getRequest(filter) {
            if (this.inputValue) {
            	this.users = [];
                filter === null ? this.filter = 'возрастание' : this.filter = filter;

                if (this.filter === 'возрастание') {
                    fetch(this.URL + this.inputValue + '&sort=repositories&per_page=10')
                        .then(response => response.json())
                        .then(users => this.requestHandler(users));
                } else if (this.filter === 'убывание') {
                    fetch(this.URL + this.inputValue + '&per_page=10')
                        .then(response => response.json())
                        .then(users => this.requestHandler(users));
                }
            }
        },
        requestHandler(data) {
            console.log(data);

            if (data.total_count > 0) {
                this.countUsers = data.total_count;
                const requestUsers = data.items;

                requestUsers.forEach(user => {
                    this.users.push(user);
                });
            } else {
                console.log(111);
            }

        },
        showMore() {
            console.log('showMore');
        }
    }
}

Vue.createApp(SearchApp).mount('#search');

//sort=repositories repos