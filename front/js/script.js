String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

$(document).ready(function(){

  Vue.component('range', {
    props: {
      value: {
        type: Number,
        default: '0'
      },
			max: {
				type: Number,
				default: 100
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
				percent: 0
			};
		},
    methods: {
			restyle(e) {
				if(e && e.target){
					this.$emit('input', +e.target.value);
				}
			}
    },
    computed: {
			colorPercen: function(){
				return ~~this.value;
			},
			grad:  function(){
					let { color, value, bgcolor, max} = this;
					//value = Math.round(value*100/max);
					value = value*100/max	;
					let nValueStart = Number(value.toFixed(5));
					let nValueEnd = Number(0.00002) + Number(nValueStart);
					//return `linear-gradient(to right, ${color} 0%, ${color} ${value}%, ${bgcolor} ${value}.1%, ${bgcolor} 100%)`;
					return `linear-gradient(to right, ${color} 0%, ${color} ${nValueStart}%, ${bgcolor} ${nValueEnd}%, ${bgcolor} 100%)`;
				}			
    },
    created: function(){
      this.restyle();
    },
    template: "<input type='range' :value='value' :style='{ background: grad}' @input='restyle' min='0' :max='max'>"
  });
	
  Vue.component('volume-range', {
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
			restyle(e) {
				if(e && e.target){
					this.$emit('input', +e.target.value);
				}
			},
			click: function(e) {
				e.stopImmediatePropagation();
				return false;
			}
    },
    computed: {
			grad() {
				const { color, value, bgcolor } = this;
				return `linear-gradient(to right, ${color} 0%, ${color} ${value}%, ${bgcolor} ${value}.1%, ${bgcolor} 100%)`;
			},
			title(){
				return "Уровень громкости "+this.value+"%"
			}
    },
    created: function(){
      this.restyle();
    },
    template: ` <div class='VolumeWrapper' @click='click' :title="title">
        <i class="fa fa-volume-down" aria-hidden="true"></i>
        <div class='rangeWrapper'>
					<input type='range' :value='value' :style='{ background: grad}' @input='restyle'>
        </div>
        <i class="fa fa-volume-up" aria-hidden="true"></i>
      </div>`
  });
	
  Vue.component('player-button', {
    props: {
			id: {
				type: String
			},
			ico: {
				type: String,
				default: ""
			}
    },
    methods: {     
			
    },
    computed: {
			icoShowable: function() {
				return (this.ico && this.ico.length>0);
			},
			styleClass: function() {
				var oClass={};

				let sIcoName = "fa fa-"+this.ico;
				oClass[sIcoName] = this.icoShowable;

				return oClass;
			}
    },
    created: function(){
      
    },
    template: `<button class='btn' :id='id'>
           <i v-if='icoShowable' v-bind:class='styleClass' aria-hidden="true"></i>
        </button>`
  });
	
  Vue.component('player-play-button', {
    props: {
			state: {
				type: Boolean,
				default: false
			}
    },
    methods: {     

			},
    computed: {
			isPlay: function(e) {
				return this.state;
			}
    },
    created: function(){
      
    },
    template: `<button class='btn' id='PlayerPlayPauseButton'>
           <i v-show='isPlay' class='fa fa-pause' aria-hidden="true"></i>
           <i v-show='!isPlay' class='fa fa-play' aria-hidden="true"></i>
        </button>`
  });
	
		
  Vue.component('toggle-button', {
    props: {
			state: {
				type: Boolean,
				default: false
			},
			ico: [String, Array],
			title: {
				type: String,
				default: ""
			},
			id: {
				type: String,
				deafult: ""
			}
    },
    methods: {     

			},
    computed: {
			isPressed: function(e) {
				return this.state;
			},
			icoShowable: function() {
				return (this.ico && this.ico.length>0);
			},
			styleClass: function() {
				var oClass={};
				
				oClass.pressed = this.isPressed;

				return oClass;
			},
			icoClass: function() {
				var oClass={};
				let sIco = "";
				if (this.isPressed) {
					if(Array.isArray(this.ico)){
						sIco = this.ico[1];
					} else {
						sIco = this.ico;
					}
				} else {
					if(Array.isArray(this.ico)){
						sIco = this.ico[0];						
					} else {
						sIco = this.ico;
					}
				}
				let sIcoName = "fa fa-"+sIco;
				oClass[sIcoName] = this.icoShowable;

				return oClass;
			}
    },
    created: function(){
      
    },
    template: `<button class='tBtn' :id='id' :class="styleClass">
           <i v-if='icoShowable' :class='icoClass' aria-hidden="true"></i>
        </button>`
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
			value: {
				type: Number,
				default: 50
			},
      title: {
        type: String,
        default: "заголовок"
      },
      id: {
        type: String
      },
			visible: {
				type: Boolean,
				default: true
			},
      show_buttons: {
      	type: Boolean,
        default: false
      },
      show_volume: {
      	type: Boolean,
        default: false
      },
      show_settings: {
      	type: Boolean,
        default: false
      },

      sources: {
        type: Array,
				default: function(){
					return [];
				}
      },

      checked: {
        type: Array,
				default: function(){
					return [];
				}
      },
    },
    computed: {
      bShowSettings: function() {
        return this.show_settings
      },
			isSelected: function() {
				return this.checked.indexOf(this.id)>-1;
			},
			buttonsVisibility: function(){
				return this.show_buttons == true;
			},
			styleclass: function() {
				return {
					active: (this.checked.indexOf(this.id)>-1) //this.id == this.choosen; // (this.checked.indexOf(this.id)>-1)
				};
			},
			realVolume: {
					get: function() {
						return this.value;
					},
					set: function(nVal) {
						this.value = nVal;
					}
				}
    },
    methods: {
    	random: function(oEvent) {
				alert('random');
      },
    	play: function(oEvent) {
				alert('play');
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
    template: `<div v-if='visible' class='PlayListTag' v-bind:class='styleclass'>
          <div class='inner' v-on:click='toggleActive'>
            <div class='title'>{{title}}</div>
						<div v-if='show_volume === true'>
							<volume-range :value="value" @input="$emit('input', $event)"></volume-range>
							<audio class='tagAudio'></audio>
						</div>	
            <div v-if='buttonsVisibility' class='buttons'>
              <button v-show='!isSelected' class='btn' title='Воспроизведение' @click.stop='play'>
                <i class='fa fa-play' aria-hidden='true'></i>
              </button>
              <button v-show='isSelected' class='btn' title='Пауза' @click.stop='pause'>
                <i class='fa fa-pause' aria-hidden='true'></i>
              </button>
              <button class='btn' title='Перемешать плейлист' @click.stop='random'>
                <i class='fa fa-random' aria-hidden='true'></i>
              </button>
              <button class='btn' title='Закрепить текущую мелодию' @click.stop='fix'>
                <i class='fa fa-thumb-tack' aria-hidden='true'></i>
              </button>
              <button class='btn' v-bind:class='{ active: show_settings }' title='Настройки' @click.stop='toggleSettings'>
                <i class='fa fa-cog' aria-hidden='true'></i>
              </button>
            </div>
          </div>
          <div class='settings' v-if='show_settings === true'>
          	<div class='s-title'>Настройки</div>
            <slot></slot>
          </div>
        </div>`
  });

  Vue.component('playlist-group', {
    props: {
      title: {
        type: String,
        default: "заголовок"
      },
      checked: {
        type: Array,
				default: function(){
					return [];
				}
      },
      styleclass: {
        type: String,
        default: ""
      },
			visible: {
				type: Boolean,
				default: true
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
    template: "<div class='PlayListGroup' v-bind:class='[styleclass]' v-show='visible'>\
      <div class='PlayListGroupTitle'>\
        <div class='title'>\
           {{title}}, ({{checked}})\
        </div>\
      </div>\
      <div class='flexContent' id='PlayListGroupEmotions'>\
        <slot></slot>\
      </div>\
    </div>"
  });
	
  Vue.component('playlist-item', {
    props: {
      title: {
        type: String,
        default: "заголовок"
      },
      checked: {
        type: Array,
				default: function(){
					return [];
				}
      },
      styleclass: {
        type: String,
        default: ""
      },
			visible: {
				type: Boolean,
				default: true
			},
			list: {
				type: Array,
				default: function(){
					return [];
				}
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
    template: `<div class='PlayListGroup' v-bind:class='[styleclass]' v-show='visible'>
      <div class='PlayListGroupTitle'>
        <div class='title'>
           {{title}}, ({{checked}})
        </div>
      </div>
      <div class='flexContent' id='PlayListGroupEmotions'>
        <playlist-tag
					v-for="tagItem in list"
					:key="tagItem.id"
					:id="tagItem.id"
					:checked="checked"
					:title="tagItem.title"
					v-bind="tagItem.params"
					@click.native="$emit('tclick', tagItem.id)">
				</playlist-tag>
      </div>
    </div>`
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
      main: {
				array: [
					{
						place: {
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
									params: {
										showButtons: false										
									}
								},
								{
									id: "22",
									title: "Заброшка",
									params: {
										showButtons: false										
									}
								},
								{
									id: "23",
									title: "Таверна",
									params: {
										showButtons: false										
									}
								}
							]
						},
						tone: {
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
									params: {
										showButtons: false										
									},
									places: [
										21,
										22,
										23
									]
								},
								{
									id: "12",
									title: "Экшн",
									params: {
										showButtons: false										
									},
									places: [
										22,
										23
									]
								},
								{
									id: "13",
									title: "Погоня",
									params: {
										showButtons: false										
									},
									places: [
										21
									]
								}
							]
						},
						embient: {
							id: "3",
							title: "Окружение",
							styleclass: "fullWidth",
							selectType: "check",
							targetFolder: "_embient",
							selectedTagIds: [
									"31",
									"33"
								],
							tags: [
								{
									id: "31",
									title: "Ветер",
									targetFolder: "wind",
									list: [
										0
									],
									params: {
										showButtons: true,
										showVolume: true,
										volume: 70			
									}
								},
								{
									id: "32",
									title: "Море",
									targetFolder: "sea",
									list: [
										0,
										1
									],
									params: {
										showButtons: true,
										showVolume: true,
										volume: 10			
									}
								},
								{
									id: "33",
									title: "Ночь",
									targetFolder: "night",
									list: [
										0,
										1
									],
									params: {
										showButtons: true,
										showVolume: true,
										volume: 30			
									}
								},
								{
									id: "34",
									title: "Река",
									showButtons: true,
									showVolume: true,
									volume: 50,
									visible: false,
									
								},
								{
									id: "35",
									title: "Лес днем",
									showButtons: true,
									showVolume: true,
									volume: 50,
									
									visible: false,
								}
							]
						},
						sounds: {
							id: "4",
							title: "Звуки",
							styleclass: "fullScreen overlay",
							visible: false,
							selectType: "button",
							tags: [
								{
									id: "41",
									title: "Бум",
									ico: "",
									showButtons: false,
									src: [
										{
											title: "src1",
											id: "411",
											count: 1
										}
									]
								},
							]
						}
					}
				],
				selectedIndex: 0
			},

			player: {
				track: {
					maxVal: 1000,
					val: 0,
					maxTime: 50.345345,
					curTime: 20.345345,
					entity: {
						title: "",
						src: "",
					}
				},
				volume: {
					val: 50
				},
				isPlayed: false,
				isFade: false
			},
			
			musicData: {
				music: {
					list: [
						{
							title: "Active 01",
							src: "music/active/01.mp3",
							tags: [
								"21",
								"22",
								"12"
							]
						},
						{
							title: "Active 02",
							src: "music/active/02.mp3",
							tags: [
								"21",
								"22",
								"12"
							]
						},
						{
							title: "Norm 01",
							src: "music/norm/01.mp3",
							tags: [
								"21",
								"22",
								"11"
							]
						},
						{
							title: "Norm 02",
							src: "music/norm/02.mp3",
							tags: [
								"21",
								"22",
								"11"
							]
						},
						{
							title: "Tavern 01",
							src: "music/tavern/01.mp3",
							tags: [
								"23",
								"11"
							]
						},
						{
							title: "Tavern 02",
							src: "music/tavern/02.mp3",
							tags: [
								"23",
								"11"
							]
						}
					]
				},
				embient: {
					rootFolder: "_embient",
					folders: {
						"night": {
							title: "Ночь",
							list: [
								{
									title: "Jungle",
									src: "jungle.mp3",
									id: "1"
								},
								{
									title: "Night",
									src: "night.mp3",
									id: "2"
								}
							]
						},
						"sea": {
							title: "Море",
							list: [
								{
									title: "Jungle",
									src: "jungle.mp3",
									id: "1"
								},
								{
									title: "Night",
									src: "night.mp3",
									id: "2"
								},
							]
						},
						"wind": {
							title: "Ветер",
							list: [
								{
									title: "Ветер",
									src: "wind.mp3",
									id: "1"
								}
							]
						},
					
					}
				},
				sounds: {
					rootFolder: "_sounds",
					folders: {
						"shoot": {
							title: "Выстрел",
							list: [
								{
									title: "Выстрел 02",
									src: "выстрел 02.wav",
									id: "1"
								},
								{
									title: "Осечка 01",
									src: "осечка 01.wav",
									id: "2"
								}
							]
						}
					}
				}
			}
    },
		computed: {
			arr: function(){
				return this.main.array[this.main.selectedIndex];
			},
			musicPlaceFilterValue: function(){
				return this.arr.place.tags.filter(function(oItem){
					return oItem.id == this.arr.place.selectedTagIds[0]
				}.bind(this))[0].id
			},
			musicToneFilterValue: function(){
				return this.arr.tone.tags.filter(function(oItem){
					return oItem.id == this.arr.tone.selectedTagIds[0]
				}.bind(this))[0].id
			},
			
			musicTrackDuration: function(){
				return String(this.player.track.maxTime).toHHMMSS();
			},			
			musicTrackCurTime: function(){
				return String(this.player.track.curTime).toHHMMSS();
			},	
			musicTrackLength: {
				get: function() {
					return (this.player.track.maxTime)? this.player.track.maxVal * (this.player.track.curTime / this.player.track.maxTime): 0;
				},
				set: function(newValue){
					this.player.track.curTime = Math.ceil(this.player.track.maxTime*newValue / this.player.track.maxVal);
					let oAudio = document.getElementById("PlayerAudio");
					//oAudio.pause();
					oAudio.currentTime = this.player.track.curTime;
					//oAudio.play();
				}				
			},
			musicTrackVolume: function(){
				return this.player.volume.val/100;
			}
			
		},
		methods: {
			onSelectTag(tags, id) {
				if (tags.selectType == 'radio') {
					tags.selectedTagIds.pop();
					tags.selectedTagIds.push(id);
					this.pauseMusic();
					this.player.track.entity={};
					//this.playMusic();
					//this.onPlayPauseClick();
					  this.playAll();
				} 
				if (tags.selectType == 'check') {
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
			},
			
			startMainAudio(){
				let oAudio = document.getElementById("PlayerAudio");
				if(oAudio.readyState == 4) {
					oAudio.play();
				} else {
					oAudio.addEventListener("canplay", function(){
						if (this.player.isPlayed) {
							oAudio.play();
							this.player.track.maxTime = oAudio.duration;
						}
					}.bind(this));
				}
				oAudio.volume = this.musicTrackVolume;

				oAudio.addEventListener("timeupdate", function(){					
					this.player.track.curTime = oAudio.currentTime;
					this.player.track.maxTime = oAudio.duration;
				}.bind(this)); 

			},
			
			pauseMainAudio(){
				let oAudio = document.getElementById("PlayerAudio");
				oAudio.pause();
				//this.player.track.maxTime = oAudio.duration;
			},
			
			findMusicTrack(){
				let aSuitableTracks = this.musicData.music.list.filter(function(oTrack){
					if (
						oTrack.tags.indexOf(this.musicPlaceFilterValue)>-1 &&
						oTrack.tags.indexOf(this.musicToneFilterValue)>-1
						) {
							return true;
						}
				}.bind(this));
				this.player.track.entity = aSuitableTracks[0];
			},
			
			playMusic(){
				if (this.player.entity) {
				} else {
					this.findMusicTrack();
				}
				this.startMainAudio();
			},
			pauseMusic(){
				this.pauseMainAudio();
			},
			
			playAll(){
				this.player.isPlayed = true;
				this.playMusic();
			},
			pauseAll(){
				this.player.isPlayed = false;
				this.pauseMusic();
			},
			
			onPlayPauseClick() {
				//this.player.isPlayed = !this.player.isPlayed;
				
				if(this.player.isPlayed) {
					this.pauseAll();
				} else {
					this.playAll();
				}
			},
			
			changePlayerVolume: function() {
				let oAudio = document.getElementById("PlayerAudio");
				oAudio.volume = this.musicTrackVolume;
			},
			
			onFadeClick() {
				this.player.isFade = !this.player.isFade;
			}
		}
  });
});
