$(document).ready(function(){

  Vue.component('range', {
    props: {
      value: {
        type: String,
        default: '0'
      },/**/
      grad: {
        type: String,
        default: "linear-gradient(to right, #transparent 0%, #transparent 0%, #fff 0.1%, #fff 100%)"
      },/**/
      percent: {
        type: Number
      },
      color: {
        type: String,
        default: "#7986CB"
      },
      bgcolor: {
        type: String,
        default: "#eee"
      }
    },
	data: function(){
		return {
			
		};
	},
    methods: {
      restyle: function(oEvent) {
        var nPercent = oEvent? oEvent.currentTarget.value : this.value;
        this.value = nPercent;
        //this.percent = nPercent;
        this.grad = "linear-gradient(to right, "+this.color+" 0%, "+this.color+" "+nPercent+"%, "+this.bgcolor+" "+nPercent+".1%, "+this.bgcolor+" 100%)";
      }
    },
    computed: {
      grad0: function(){
        //return "linear-gradient(to right, #transparent 0%, #transparent "+this.percent+"%, #fff "+this.percent+".1%, #fff 100%)";
		//return "linear-gradient(to right, "+this.color+" 0%, "+this.color+" "+nPercent+"%, "+this.bgcolor+" "+nPercent+".1%, "+this.bgcolor+" 100%)";
      }
    },
    created: function(){
      this.restyle();
    },
    template: "<input type='range' v-bind:value='value' v-bind:style='{ background: grad}' @mousemove='restyle' @mousedown='restyle'>"
  });


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
      id: {
        type: String
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
        type: Array
      },
      selectedval: {
        type: String
      },
      val: {
        type: String
      },
      choosen: {
        type: String,
        default: "--"
      }
    },
    computed: {
      bShowSettings: function() {
        return this.show_settings
      },
	  isSelected: function() {
		 return {
			 active: this.id == this.choosen		 
		 };
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
      toggleActive: function(val) {
		//this.choosen =  this.id;
       // alert("Active!");
        this.$bus.$emit('tagSelected', {title: this.title, key: this.id});
      }
    },
    template: "<div class='PlayListTag' v-bind:class='isSelected'>\
          <div class='inner' v-on:click='toggleActive'>\
            <div class='title'>{{title}} ({{choosen}})</div>\
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
      choosen: {
        type: String,
        default: "-"
      },
      styleclass: {
        type: String,
        default: "заголовок"
      }
    },
    mounted() {
      this.$bus.$on('tagSelected', this.selectTag);
    },
    destroyed() {
      this.$bus.$off('tagSelected')
    },
    methods: {
      selectTag: function(oData) {
		this.choosen = oData.key
        //alert(oData.key+" "+this.choosen);
        console.dir(oData);

      }
    },
    template: "<div class='PlayListGroup' v-bind:class='[styleclass]'>\
      <div class='PlayListGroupTitle'>\
        <div class='title'>\
           {{title}} ({{choosen}})\
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

  var oEventBus = new Vue();
  Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return oEventBus
    }
  }
})
  var player = new Vue({
    el: '#app',
    data: {
      arr: [
        {
          id: "1",
          title: "Настоение",
		  smth: "00",
          styleclass: "Emotions",
          selectedTagId: "11",
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
            },
            {
              id: "13",
              title: "Погоня",
              src: [
                {
                  title: "src3",
                  id: "131"
                },
                {
                  title: "src4",
                  id: "132"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          title: "Места",
          styleclass: "Places",
          selectedTagId: "21",
          tags: [
            {
              id: "21",
              title: "Везде",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "211"
                }
              ]
            },
            {
              id: "22",
              title: "Заброшка",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "221"
                }
              ]
            }
          ]
        }
      ]
    }
  });
});
