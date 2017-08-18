$(document).ready(function(){
  
  Vue.component('playlist-tag', {
    props: {
      title: {
        type: String,
        default: "заголовок"
      },
      show_buttons: {
      	type: Boolean,
        default: true
      },
      show_settings: {
      	type: Boolean,
        default: false
      },
      isActive: {
      	type: Boolean,
        default: false
      },
      sources: {
        type: Array,
        default: []
      }
    },
    methods: {
    	random: function(oEvent) {
      	alert('random');
      },
      toggleSettings: function(oEvent) {
        	this.show_settings = !this.show_settings;
      },
      toggleActive: function(oEvent) {
        this.isActive = !this.isActive;
      }
    },
    template: "<div class='PlayListTag' v-bind:class='{ active: isActive }' v-on:click='toggleActive'>\
          <div class='title'>{{title}}</div>\
          <div v-if='show_buttons === true' class='buttons'>\
            <button class='btn' title='Перемешать плейлист' v-on:click.stop='random'>\
              <i class='fa fa-random' aria-hidden='true'></i>\
            </button>\
            <button class='btn' title='Закрепить текущую мелодию'>\
              <i class='fa fa-thumb-tack' aria-hidden='true'></i>\
            </button>\
            <button class='btn' title='Выбрать источники' v-on:click.stop='toggleSettings'>\
              <i class='fa fa-cog' aria-hidden='true'></i>\
            </button>\
          </div>\
          <div class='settings' v-if='show_settings === true'>\
          	Настройки\
          </div>\
        </div>"
  });

  
  var PlayListGroupEmotions = new Vue({
    el: '#PlayListGroupEmotions'
  });
  
  var PlayListGroupPlaces = new Vue({
    el: '#PlayListGroupPlaces'
  });
}); 