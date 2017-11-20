// import { mapGetters } from 'vuex'

export default {
  computed: {
  },

  data: function () {
    return {
      contacts: {
        'A': [
          'Adele',
          'Agnes',
          'Albert'
        ],
        'B': [
          'Bellamy',
          'Belle'
        ],
        'C': [
          'Candy',
          'Cherilyn',
          'Chloe'
        ],
        'V': [
          'Vladimir'
        ]
      },
      sorting: false,
      items: [1, 2, 3, 4, 5],
      name: 'Vladimir',
      avatar: 'http://lorempixel.com/100/100/people/3/',
      messages: [
        {
          day: 'Wendesday',
          time: '13:34'
        },
        {
          id: 1,
          name: 'Vladimir',
          text: 'How are you?',
          label: 'Sent in good mood :)',
          avatar: 'http://lorempixel.com/100/100/people/3/',
          date: 'Yesterday 13:34'
        },
        {
          id: 2,
          name: 'Jane',
          text: 'I\'m good, thank you!',
          type: 'received',
          avatar: 'http://lorempixel.com/100/100/people/9/',
          date: 'Yesterday at 13:50'
        }
      ]
    }
  },

// lifecycle: init
  beforeCreate () {
    console.log('beforeCreate(): nothing gets called before me')
  },
  created () {
    console.log('created(): computed will be updated')
  },
// lifecycle: DOM
  beforeMount () {
    console.log(`beforeMount(): this.joke doesn't exist yet`)
  },
  mounted () {
    console.log('mounted(): component did mount')
  },
// Updating (Re-render)
  beforeUpdate () {
    console.log('beforeUpdate(): before the DOM updates')
  },
  updated () {
    console.log('updated(): after DOM updates')
  },
// Destruction (Teardown)
  beforeDestroy () {
    console.log('beforeDestroy(): that Chuck Norris fixed look...')
  },
  destroyed () {
    console.log('destroyed(): *PAW* You\'re gone for good!')
  },

  methods: {
    onF7Init () {
      console.info('@_TEST.onF7Init()')

      // const self = this
      // self.$f7.addView('.view-one'...
    },

    onChipDelete () {},
    onActionClick () {},
    onChange () {},
    onSwipeoutDeleted () {},
    doSomething () {},

    onOpen: function () {
      this.sorting = !this.sorting
    },
    onClose: function () {
      this.sorting = !this.sorting
    },
    onSort: function (event, indexes) {
      console.log('sort', indexes)
    },

    onClick: function (event) {
      console.log('message click');
    },
    onAvatarClick: function () {
      console.log('avatar-click');
    },
    onTextClick: function () {
      console.log('text-click');
    },
    onNameClick: function () {
      console.log('name-click');
    },
    onSubmit: function (text, clear) {
      if (text.trim().length === 0) return;
      this.messages.push({
        name: this.name,
        avatar: this.avatar,
        text: text,
        date: (function () {
          var now = new Date();
          var hours = now.getHours();
          var minutes = now.getMinutes();
          return hours + ':' + minutes;
        })()
      });
      // Clear Message Bar
      clear();
    }
  },

  components: {
    navbar: require('../partials/Navbar.vue')
  }
}
