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
