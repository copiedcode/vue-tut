window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data=null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback){
        this.vue.$on(event, callback);
    }
}



Vue.component('coupon', {
    template: "<input placeholder='Enter your code.' @blur='onCouponApplied'>",
    methods: {
        onCouponApplied() {
            Event.fire('applied');
        }

    }
})



Vue.component('tabs', {
    template:`
    <div>
        <div class="tabs" >
        <ul>
          <li v-for="tab in tabs" :class="{'is-active':tab.isActive}">
              <a :href="tab.href" @click="selectTab(tab)">
                {{tab.name}}
              </a>
          </li>
          </ul>
        </div>
        
        <div class="tabs-details">
            <slot></slot>
        
        </div>
    </div>
`,

    data(){
        return { tabs: [] };
    },

    created(){
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            })
        }
    }
});

Vue.component('tab', {
    template: '<div v-show="isActive" ><slot></slot></div>',
    props: {
        name: { required: true},
        selected: { default: false}
    },
    data() {
        return {
            isActive: false
        }
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted(){
        this.isActive =  this.selected;
    }


});





Vue.component('taske', {
    props: ['title', 'description', 'deadline'],
    data(){
        return {
            showMore: false
        };
    },
    template:`

      <div class="card" style="margin: 1em 10px">
  <header class="card-header">
    <p class="card-header-title">
      {{ title }} - {{ deadline }}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon" @click="showMore = !showMore">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div v-if="showMore" class="card-content">
    <div class="content">
      {{ description }}
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">Save</a>
    <a href="#" class="card-footer-item">Edit</a>
    <a href="#" class="card-footer-item">Delete</a>
  </footer>
</div>

    `
    });
Vue.component('message', {
    props: ['title', 'body'],
    data() {
        return {
            isVisible: true
        };
    },
    template: `
        <article class="message" v-show="isVisible">
            <div class="message-header">
                {{ title }}
                <button class="delete" @click="isVisible = false" aria-label="delete"></button>
            </div>
            <div class="message-body">
            {{ body }}
            </div>
        </article>
    `
});






Vue.component('task-list', {
    template: '<div><task v-for="task in tasks">{{ task.task }}</task></div>',

    data(){
        return {
            tasks: [
                { task: 'Aufstehen', completed: true},
                { task: 'Essen kaufen', completed: false},
                { task: 'Kochen', completed: false},
                { task: 'Essen', completed: false},
                { task: 'VUE lernen!', completed: false}
            ]
        }
    }

});


Vue.component('task', {
    template: '<li><slot></slot></li>'

});


let app = new Vue({
    el: '#root',

    data:  {
        showModal: false,
        tasks: [
            { description: 'Aufstehen', completed: true},
            { description: 'Essen kaufen', completed: false},
            { description: 'Kochen', completed: false},
            { description: 'Essen', completed: false},
            { description: 'VUE lernen!', completed: false}
        ],
        couponApplied: false
    },

    methods: {

        toggleDone(task){
            task.completed = !task.completed;
        }

    },

    computed: {
        reversedMessage(){
            return this.message.split('').reverse().join('');
        },

        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
        },
        completeTasks(){
            return this.tasks.filter(task => task.completed);
        }
    },

    created() {
        Event.listen('applied', () => alert('once again'));
    },

    //if everything is ready
    mounted() {

    }
})
