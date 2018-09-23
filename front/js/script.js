$(document).ready(function(){

  Vue.component('range', {
    props: {
      value: {
        type: Number,
        default: '0'
      },/*/
      grad: {
        type: String,
        default: "linear-gradient(to right, #transparent 0%, #transparent 0%, #fff 0.1%, #fff 100%)"
      },/**/
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
			percent: 0
		};
	},
    methods: {
      // restyle: function(oEvent) {
        // var nPercent = oEvent? oEvent.currentTarget.value : this.value;
        // this.value = nPercent;
       // // this.percent = nPercent;
        // this.grad = "linear-gradient(to right, "+this.color+" 0%, "+this.color+" "+nPercent+"%, "+this.bgcolor+" "+nPercent+".1%, "+this.bgcolor+" 100%)";
      // }
	  restyle(e) {
		  if(e && e.target){
			this.$emit('input', +e.target.value);
		  }
		}
    },
    computed: {
			grad() {
				const { color, value, bgcolor } = this;
				return `linear-gradient(to right, ${color} 0%, ${color} ${value}%, ${bgcolor} ${value}.1%, ${bgcolor} 100%)`;
			}	
    },
    created: function(){
      this.restyle();
    },
    template: "<input type='range' :value='value' :style='{ background: grad}' @input='restyle'>"
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

      sources: {
        type: Array
      },

      choosen: {
        type: String,
        default: "--"
      },
      checked: {
        type: Array
      },
    },
    computed: {
      bShowSettings: function() {
        return this.show_settings
      },
	  isSelected: function() {
		 return {
			 active: (this.checked.indexOf(this.id)>-1) //this.id == this.choosen; // (this.checked.indexOf(this.id)>-1)
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
        //this.$bus.$emit('tagSelected', {title: this.title, key: this.id});
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
      checked: {
        type: Array
      },
      styleclass: {
        type: String,
        default: ""
      }
    },	
    mounted() {
      //this.$bus.$on('tagSelected', this.selectTag);
    },
    destroyed() {
      //this.$bus.$off('tagSelected')
    },
    methods: {
     
    },
    template: "<div class='PlayListGroup' v-bind:class='[styleclass]'>\
      <div class='PlayListGroupTitle'>\
        <div class='title'>\
           {{title}}, ({{choosen}}, {{checked}})\
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
          id: "2",
          title: "Места",
          styleclass: "compactWidth",
          selectedTagId: "21",
					selectType: "radio",
          selectedTagIds: [
							"21"
						],
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
        },
        {
          id: "1",
          title: "Настоение",
          styleclass: "compactWidth",
          selectedTagId: "11",
					selectType: "radio",
          selectedTagIds: [
							"11"
						],
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
          id: "3",
          title: "Окружение",
          styleclass: "fullWidth",
					selectType: "check",
          selectedTagIds: [
							"31",
							"33"
						],
          tags: [
            {
              id: "31",
              title: "Дождь",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "311"
                }
              ]
            },
            {
              id: "32",
              title: "Толпа",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "321"
                }
              ]
            },
            {
              id: "33",
              title: "Огонь",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "331"
                }
              ]
            },
            {
              id: "34",
              title: "Река",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "341"
                }
              ]
            },
            {
              id: "35",
              title: "Лес днем",
              showButtons: false,
              src: [
                {
                  title: "src1",
                  id: "351"
                }
              ]
            }
          ]
        }
      ],

			player: {
				track: {
					val: 0
				},
				volume: {
					val: 50
				},
			}
    },
		methods: {
			onSelectTag(tags, id) {
				if(tags.selectType == 'radio') {
					tags.selectedTagIds.pop();
					tags.selectedTagIds.push(id);
				} else {
					if(tags.selectedTagIds.indexOf(id)>-1) { // exists
						for(var i=0; i<tags.selectedTagIds.length; i++) {
							if(tags.selectedTagIds[i] == id) {
								tags.selectedTagIds.splice(i,1);
							}
						}
					} else { // no exists
						tags.selectedTagIds.push(id);
					}
				}
			}
		}
  });
});
