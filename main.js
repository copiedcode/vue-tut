Vue.component('modal', {
    template:`
        <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" @click="$emit('close')" aria-label="close"></button>
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
        ]
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

    //if everything is ready
    mounted() {

    }
})
