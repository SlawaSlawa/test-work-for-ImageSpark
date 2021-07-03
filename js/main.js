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
            toggleScroll: 'scroll',
            profileUrl: '',
            detailsAvatar: '',
            detailsLogin: '',
            detailsFolowers: 0,
            detailsRepos: 0
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
        },
        getDetails(login) {
            fetch(this.URL + login)
                .then(response => response.json())
                .then(user => {
                    this.profileUrl = user.items[0].html_url;
                    this.detailsAvatar = user.items[0].avatar_url;
                    this.detailsLogin = user.items[0].login;
                    this.getDetailsInfo(user.items[0].followers_url, 'followers');
                    this.getDetailsInfo(user.items[0].repos_url, 'repos');
                });
        },
        getDetailsInfo(url, info) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                   info === 'followers' ? this.detailsFolowers = data.length : this.detailsRepos = data.length;
                });
        }
    }
}

Vue.createApp(SearchApp).mount('#app');

