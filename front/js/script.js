$(document).ready(function(){
  
  Vue.component('playlist-source-option', {
    props: {
      title: {
        type: String,
        default: "источник"
      }
    },
    template: "<div><label><input type='checkbox'> {{title}}</label></div>"
  });
  
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
    	fix: function(oEvent) {
      	alert('fix');
      },
      toggleSettings: function(oEvent) {
        	this.show_settings = !this.show_settings;
      },
      toggleActive: function(oEvent) {
        this.isActive = !this.isActive;
      }
    },
    template: "<div class='PlayListTag' v-bind:class='{ active: isActive }' v-on:click='toggleActive'>\
          <div class='inner'>\
            <div class='title'>{{title}}</div>\
            <div v-if='show_buttons === true' class='buttons'>\
              <button class='btn' title='Перемешать плейлист' v-on:click.stop='random'>\
                <i class='fa fa-random' aria-hidden='true'></i>\
              </button>\
              <button class='btn' title='Закрепить текущую мелодию' v-on:click.stop='fix'>\
                <i class='fa fa-thumb-tack' aria-hidden='true'></i>\
              </button>\
              <button class='btn' v-bind:class='{ active: show_settings }' title='Выбрать источники' v-on:click.stop='toggleSettings'>\
                <i class='fa fa-cog' aria-hidden='true'></i>\
              </button>\
            </div>\
          </div>\
          <div class='settings' v-if='show_settings === true'>\
          	<div class='s-title'>Источники</div>\
            <slot></slot>\
          </div>\
        </div>"
  });

  Vue.component('playlist-group', {
    props: {
      title: {
        type: String,
        default: "заголовок"
      },
      styleclass: {
        type: String,
        default: "заголовок"
      },
      selectedTagId: {
        type: String
      }
    },
    methods: {
      selectTag: function(oEvent) {
        console.log("click tag")
      }
    },
    template: "<div class='PlayListGroup' v-bind:class='[styleclass]'>\
      <div class='PlayListGroupTitle'>\
        <div class='title'>\
           {{title}}\
        </div>\
      </div>\
      <div class='flexContent' id='PlayListGroupEmotions'>\
        <slot></slot>\
      </div>\
    </div>"
  });

  Vue.component('playlists', {
    template: '<div class="PlayLists">\
       <slot></slot>\
    </div>'
  });
  
  
  var player = new Vue({
    el: '#app',
    data: {
      arr: [
        {
          id: "1",
          title: "Настоение",
          styleclass: "Emotions",
          selectedTegId: "11",
          tags: [
            {
              id: "11",
              title: "Фон",
              src: [
                {
                  title: "src1",
                  id: "111"
                },
                {
                  title: "src2",
                  id: "112"
                },
                {
                  title: "src3",
                  id: "113"
                }
              ]
            },
            {
              id: "12",
              title: "Экшн",
              src: [
                {
                  title: "src3",
                  id: "121"
                },
                {
                  title: "src4",
                  id: "122"
                }
              ]
            }
          ]
        }, 
        {
          id: "2",
          title: "Места",
          styleclass: "Places",
          tags: [
            
          ]
        }
      ]
    }
  });
}); 