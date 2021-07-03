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
            currentPage: 1,
            usersNotFound: false,
            isModal: false,
            isPreloder: false,
            toggleScroll: 'scroll'
        }
    },
    methods: {
        getRequest(sort) {
            this.isPreloder = true;
            fetch(this.URL + this.inputValue + sort + '&per_page=' + this.USER_PER_PAGE + '&page=' + this.currentPage)
                .then(response => response.json())
                .then(users => this.requestHandler(users));
        },
        getUsers() {
            this.users = [];
            this.currentPage = 1;
            this.btnMoreFlag = false;

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
            this.isPreloder = false;

            if (data.total_count > 0) {
                this.usersNotFound = false;

                if (data.total_count > 10) {
                    this.btnMoreFlag = true;
                }
                this.countUsers = data.total_count;
                const requestUsers = data.items;

                requestUsers.forEach(user => {
                    this.users.push(user);
                });
            } else {
                console.log('usersNotFound');
                this.usersNotFound = true;
            }

        },
        showMore() {
            this.currentPage++;
            this.getRequest(this.filter);
        },
        toggleModal(evt) {
            if (evt.target.classList.value === 'details' ||
                evt.target.classList.value === 'close-btn' ||
                evt.target.closest('.user-list__item')
                ) {
                this.isModal? this.isModal = false : this.isModal = true;
                if (this.isModal === true) {
                    this.toggleScroll = 'no-scroll';
                }else {
                    this.toggleScroll = 'scroll';
                }
            }
        }
    }
}

Vue.createApp(SearchApp).mount('#app');

