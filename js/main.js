const SearchApp = {
    data() {
        return {
            title: 'Поиск пользователей',
            inputValue: '',
            URL: 'https://api.github.com/search/users?q=',
            countUsers: 0,
            users: [],
            filter: '&sort=repositories',
            USER_PER_PAGE: 10,
            btnMoreFlag: false,
            currentPage: 1
        }
    },
    methods: {
        getRequest(sort) {
            fetch(this.URL + this.inputValue + sort + '&per_page=' + this.USER_PER_PAGE + '&page=' + this.currentPage)
                .then(response => response.json())
                .then(users => this.requestHandler(users));
        },
        getUsers() {
            this.users = [];
            this.currentPage = 1;

            if (this.inputValue) {
                this.getRequest('&sort=repositories');
            }
        },
        getSort(filter) {
            this.users = [];
            this.btnMoreFlag = false;

            filter === null ? this.filter = '&sort=repositories' : this.filter = filter;
                if (this.filter === '&sort=repositories') {
                    this.getRequest('&sort=repositories');
                }else if (this.filter === '') {
                    this.getRequest('');
                }

        },
        requestHandler(data) {
            console.log(data);

            if (data.total_count > 0) {
                if (data.total_count > 10) {
                    this.btnMoreFlag = true;
                }
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
            this.currentPage++;
            console.log(this.currentPage);
            this.getRequest(this.filter);
        }
    }
}

Vue.createApp(SearchApp).mount('#search');

