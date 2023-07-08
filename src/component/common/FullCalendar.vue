<template>
  <div>
    <FullCalendar :options="calendarOptions" ref="calendar"/>

    <div class="layer_schedule" ref="layer_schedule" @mouseenter="enterScheduleLayer" @mouseleave="leaveScheduleLayer">
        <dl>
            <dt :class="scheduleDesc.classname">
                <span class="title">{{ scheduleDesc.title }}</span>
                <button type="button" class="btn_del" @click="hideScheduleLayer"></button>
            </dt>
            <dd>
                <p class="datetime">{{ scheduleDesc.datetime }}</p>
                <p class="place">{{ scheduleDesc.place }}</p>
                <pre class="pre-scrollable desc" style="max-height: 200px;">{{ scheduleDesc.description }}</pre>
                <p class="manager">{{ scheduleDesc.manager }}</p>
            </dd>
            <dd class="btn_area">
              <!-- 현장캘린더 버튼동작을위해 설정 -->
              <button type="button" class="btn_edit" @click="updateBtn(scheduleDesc)"></button>
              <button type="button" class="btn_del" @click="deleteBtn(scheduleDesc)"></button>
            </dd>
        </dl>
    </div>

    <div class="layer_more" :class="{type_desc: eventType === 'link'}" ref="layer_more" @mouseenter="enterMoreLayer" @mouseleave="leaveMoreLayer">
        <button type="button" class="btn_del" @click="hideMoreLayer"></button>
        <div class="date">{{ moreEvent.date }}</div>
        <div class="day">{{ moreEvent.day }}</div>
        <ul class="lst_schedule">
            <li v-for="(item, idx) in moreEvent.lst" :key="idx" :class="{ 'notStart': !item.isStart, 'notEnd': !item.isEnd }">
              <a href="javascript:void(0);" v-if="eventType === 'link'" class="event" :class="item.event.classNames[0]" @click="$emit('click-event', item)" @mouseenter="enterMoreEvent" @mouseleave="leaveMoreEvent">
                <!-- showDesc(item.event, $event) -->
                <span class="title">{{ item.event.title }}</span>
                <span class="desc" v-if="eventType === 'link'">{{ item.event.extendedProps.type }}<br />{{ item.event.extendedProps.description }}</span>
              </a>
              <a href="javascript:void(0);" v-else class="event" :class="item.event.classNames[0]" @click="showDesc(item.event, $event)" @mouseenter="enterMoreEvent" @mouseleave="leaveMoreEvent">
                <!-- showDesc(item.event, $event) -->
                <span class="title">{{ item.event.title }}</span>
                <span class="desc" v-if="eventType === 'link'">{{ item.event.extendedProps.type }}<br />{{ item.event.extendedProps.description }}</span>
              </a>
              <div class="line" v-if="!item.isStart || !item.isEnd">
                <span class="before" v-if="item.isStart"></span>
                <span class="after" v-if="item.isEnd"></span>
              </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "moment/locale/ko";
// import ko from '@fullcalendar/core/locales/ko';

import _ from 'lodash'

let _vm = null;
let calendarApi = null;

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    events: {
      type: Array,
      default: function () {
        return [];
      }
    },
    dayMaxEvents: {
      type: Number,
      default: 3
    },
    eventType: {
      type: String,
      default: null
    },
    selectable: {
      type: Boolean,
      default: false
    },
    registable: {
      type: Boolean,
      default: false,
    },



    /** return dateFormat */
    dateFormat: {
      type: String,
      default: 'YYYYMMDD'
    },
    uniqueKey: {
      type: String,
    }

  },
  watch: {
    events: {
      handler (newVal) {
        this.calendarOptions.events = newVal;
/*         this.calendarOptions.events = _.uniqBy([...this.calendarOptions.events, ...newVal], this.uniqueKey)
        console.log('this.calendarOptions.events : ', this.calendarOptions.events); */
        this.calendar.render()

      },
      deep: true
    },
    'calendar.currentData.currentViewType': {
      handler (newVal) {
        // console.log('changed: %o', newVal)

        this.calendarOptions.events = []
        this.calendar.render()
      }
    }
  },
  created () {
    _vm = this;
  },
  data() {
    return {
      calendar: null,

      moreEvent: {
          date: null,
          day: null,
          lst: []
      },
      scheduleDesc: {},

      prevEvents: [],
      nextEvents: [],
      
      calendarOptions: { 
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        contentHeight: 'auto',
        //dayMaxEventRows: true, // for all non-TimeGrid views
        dayMaxEvents: this.dayMaxEvents,
        selectable: this.selectable,
        views: {
          timeGrid: {
            dayMaxEvents: this.eventType === 'link' ? true : 2 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        select: function(info) {
          _vm.selectedDate(info);
        },
        // weekNumbers: true,
        // locale: 'ko', // 한국어 설정
        // allDay:false,
        // defaultAllDayEventDuration: { days: 2 },
        allDaySlot: true,
        // selectMirror: false,
        slotMinTime: '07:00:00',
        slotMaxTime: '19:00:00',
        allDayText: '하루종일',
        nextDayThreshold: '09:00:00',
        // includeScheduleEnd: true,
        // nextDayThreshold: '09:00:00',
        // expandRows: true,
        titleFormat: function(date) {
          // console.log(date)
          let month = date.date.month + 1;
          if(month < 10) {
            month = '0' + month;
          }
          return date.date.year + '. ' + month;
        },
        
        slotLabelFormat: function (data) {
            // console.log(data);
            return _vm.$moment(data.date).format("HH:mm") + " ~ " + _vm.$moment(data.date).add(60,
                'minutes').format("HH:mm");
        },
        dayHeaderContent: function (date) {
          let weekList = ["일", "월", "화", "수", "목", "금", "토"];
          return weekList[date.dow];
        },
        headerToolbar: {
          start: "dayGridMonth,timeGridWeek",
          center: "prev title next",
          // right: "registSchedule",
          right: '',
        },
        buttonText: {
          today: '오늘',
          month: '월간',
          week: '주간',
          day: 'day',
          list: 'list'
        },
        customButtons: {
          prev: {
            text: '',
            click: this.prevFunc
          },
          next: {
            text: '',
            click: this.nextFunc
          },
          dayGridMonth: {
            text: '월간',
            click: this.dayGridMonthFunc
          },
           timeGridWeek: {
            text: '주간',
            click: this.timeGridWeekFunc
          },
          registSchedule: {
            text: '일정등록',
            click: this.registScheduleFunc
          }
        },
        dayPopoverFormat: function(arg) {
          let weekList = ["일", "월", "화", "수", "목", "금", "토"];
          let day = new Date(arg.date.marker).getDay();
          // console.log(weekList[day]);
          let dayOfWeek = weekList[day];
          //weekList[]
          return dayOfWeek
        },
        // events: [this.events],
        events: [],
        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          // second: '2-digit',
          // meridiem: false,
          hour12: false
        },
        eventClick: function(info) {
          // console.log(info.event)
          
          if(_vm.eventType !== 'link'){
            _vm.showDesc(info.event, info.jsEvent);
            // this.$emit('event-click',info)
          }

          if (_vm.eventType === 'link') {
            // console.log('event clicked: %o', info)
            _vm.$emit('click-event', info)
          }
        },
        eventContent: function(arg) {
          if(_vm.eventType === 'link'){
            let mainEvent = document.createElement('div')
            if(arg.event._def.publicId) {
              mainEvent.classList = 'fc-event-main'
            }

            let arrayOfDomNodes = [];
          
            // title event
            let titleEvent = document.createElement('div');
            if(arg.event._def.title) {
              titleEvent.innerHTML = arg.event._def.title;
              titleEvent.classList = "fc-event-title";
            }
            // type event
            let typeEvent = document.createElement('div');
            if(arg.event._def.extendedProps.type) {
              typeEvent.innerHTML = arg.event._def.extendedProps.type;
              typeEvent.classList = "fc-event-type";
            }
            // description event
            let descEvent = document.createElement('div');
            if(arg.event._def.extendedProps.description) {
              descEvent.innerHTML = arg.event._def.extendedProps.description;
              descEvent.classList = "fc-event-description";
            }
            // etc event
            let etcEvent = document.createElement('div');
            if(arg.event._def.extendedProps.etc) {
              etcEvent.innerHTML = arg.event._def.extendedProps.etc;
              etcEvent.classList = "fc-event-etc";
            }
            arrayOfDomNodes = [ titleEvent, typeEvent, descEvent, etcEvent ];

            arrayOfDomNodes.forEach(item => {
              mainEvent.appendChild(item)
            })

            return { domNodes: [mainEvent]}

            // return { domNodes: arrayOfDomNodes};
          }
          
        },
        /*
        eventDataTransform: function(eventData){
          // console.log(eventData.end)
          // if(eventData.end !== undefined || eventData.end !== null || eventData.end !== '') {
            // eventData.end = _vm.$moment(eventData.end).add(1, 'days').format();
            console.log(eventData.end)
          // }
          // eventData.end = _vm.$moment(eventData.end).add(1, 'days').format('YYYY-MM-DD');

          if(eventData.end === undefined) {
            console.log('aaa')
          } else {
            eventData.end = _vm.$moment(eventData.end).add(1, 'days').format('YYYY-MM-DD');
            return false
          }
          
          return eventData;
        },
        */
        /*
        eventContent: function(arg) {
          console.log(arg);
          let arrayOfDomNodes = [];

          arrayOfDomNodes = [ titleEvent ];

          return { domNodes: arrayOfDomNodes}
        },
        */
        
        dayCellContent: function(arg) {
          return arg.date.getDate() 
        },
        moreLinkClick:function(info) {
            _vm.showMore(info);
        },
        moreLinkContent:function(args){
          return '+'+args.num+'개 더보기';
        },
        moreLinkDidMount:function(){
          // console.log('moreLinkDidMount');
          let moreLink = document.querySelectorAll('.fc-more-link');
          moreLink.forEach(element => {
            element.addEventListener('mouseenter', function(){
              // console.log('mouseenter');
              _vm.stateMoreBtnLeave = false;
            });
            element.addEventListener('mouseleave', function(){
              // console.log('mouseleave');
              _vm.stateMoreBtnLeave = true;
            });
          });
        },
        eventMouseEnter: function() {
          // console.log(mouseEnterInfo)
          _vm.stateEventLeave = false;
        },
        eventMouseLeave: function() {
          // console.log(mouseLeaveInfo)
          _vm.stateEventLeave = true;
        },
        viewDidMount: function () {  
          // console.log(view)
          // if(view.name === 'listDay') {
          //     view.el.find('.fc-widget-header').append( '<span>&raquo; My Text</span>' );
          // }
          
        }
      }, // calendarOptions

      stateScheduleLayer: false,    // schedule layer mouse show, hide
      stateEventLeave: false,   // event mouse hover, leave

      stateMoreLayer: false,    // more layer show, hide
      stateMoreBtnLeave: false,   // more button event mouse hover, leave
    }
  }, // data
  mounted () {
    calendarApi = this.$refs.calendar.getApi();
    
    // set FullCalendar Object for watcher
    this.calendar = this.$refs.calendar.getApi()
    // console.log(calendarApi.getEvents())

    this.calendarOptions.headerToolbar.right = this.registable ? 'registSchedule' : ''
    
    document.addEventListener('click', function() {
        // console.log('stateScheduleLayer', _vm.stateScheduleLayer, _vm.stateEventLeave);
        // console.log('stateMoreLayer', _vm.stateMoreLayer, _vm.stateMoreBtnLeave);
        
        if(_vm.stateScheduleLayer && _vm.stateEventLeave) {
            // console.log(_vm.stateScheduleLayer, _vm.stateEventLeave);
            _vm.hideScheduleLayer();
        }

        if(_vm.stateMoreLayer && _vm.stateMoreBtnLeave) {
            // console.log(_vm.stateMoreLayer, _vm.stateMoreBtnLeave);
           _vm.hideMoreLayer();
        }
    });
    
  },
  beforeUpdate(){
    this.calendar.render()
  },
  methods: {
    /** 현장 캘린더 수정버튼 */
    updateBtn(obj) {
      this.$emit('updateBtn', obj)
    },
    /** 현장 캘린더 삭제버튼 */
    deleteBtn(obj) {
      this.$emit('deleteBtn', obj)
    },
    dayGridMonthFunc() {  // this overrides the day button
      calendarApi.changeView('dayGridMonth');
      this.$emit('changed', {
          type: calendarApi.currentData.currentViewType,
          date: this.$moment(calendarApi.currentData.currentDate).format(this.dateFormat),
      })
    //   console.log('change month')
    },
    timeGridWeekFunc() {  // this overrides the week button
      calendarApi.changeView('timeGridWeek');
      this.$emit('changed', {
          type: calendarApi.currentData.currentViewType,
          date: this.$moment(calendarApi.currentData.currentDate).format(this.dateFormat),
      })
      /**
       * calendarApi.changeView('timeGridDay'); // changing view
       * calendarApi.changeView('timeGridDay', '2017-06-01'); // change view for specific date
       * calendarApi.changeView('timeGrid', {
       *  start: '2017-06-01',
       *  end: '2017-06-05'
       * }); // For changing week view or month view accodring to date.
       */
    },
    prevFunc() { // this overrides the prev button
      calendarApi.prev();
    //   console.log(calendarApi.currentData.currentViewType)
      this.$emit('changed', {
          type: calendarApi.currentData.currentViewType,
          date: this.$moment(calendarApi.currentData.currentDate).format(this.dateFormat),
      })
    },
    nextFunc() { // this overrides the next button
      calendarApi.next();
      this.$emit('changed', {
          type: calendarApi.currentData.currentViewType,
          date: this.$moment(calendarApi.currentData.currentDate).format(this.dateFormat),
      })
    },
    registScheduleFunc() {
      this.$emit('writeSchedule');
    },
    showDesc(item, el) {

        /** 현장 캘린더 시간 표시 하기위해 변경 */
        let startDate = this.$moment(item.start).format('YYYY-MM-DD');
        let endDate = this.$moment(item.end).format('YYYY-MM-DD');
        const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
        let startTime = item.extendedProps.scdlStartTm
        let endTime = item.extendedProps.scdlEndTm

        const dayOfWeek = weekArr[new Date(startDate).getDay()] + "요일";
        let period = null;
        if(startTime && endTime) {
          period = `${startDate} (${dayOfWeek}) ${startTime} ~ ${endTime}`;
        } else {
          period = `${startDate} (${dayOfWeek})`;
        }

        this.scheduleDesc = {
            id : item.id,
            groupKey : item.extendedProps.groupKey,
            title: item.title,
            description: item.extendedProps.description,
            place: item.extendedProps.place,
            datetime: period,
            manager: item.extendedProps.manager,
            classname: item.classNames[0],
        };

        let layer_schedule = document.querySelector('.layer_schedule');
        layer_schedule.classList.add('on');
        this.stateScheduleLayer = true;

        let scheduleW = layer_schedule.offsetWidth;
        let scheduleH = layer_schedule.offsetHeight;

        let winW = window.innerWidth;
        let winH = window.innerHeight;
        
        if(el.clientX + scheduleW + 20 > winW) {
          layer_schedule.style.left = el.clientX - scheduleW - 20 + 'px';
        } else {
          layer_schedule.style.left = el.clientX + 'px';
        }

        if(el.clientY + scheduleH + 20 > winH) {
          layer_schedule.style.top = el.clientY - scheduleH - 20 + 'px';
        } else {
          layer_schedule.style.top = el.clientY + 20 + 'px';
        }

        
    },
    showMore(info) {
        let selectedDay = this.$moment(info.date).format('YYYY-MM-DD');
        let prevDay = this.$moment(selectedDay).subtract(1, 'days').format('YYYY-MM-DD');
        let nextDay = this.$moment(selectedDay).add(1, 'days').format('YYYY-MM-DD');

        // console.log(selectedDay, prevDay, nextDay);
        // console.log(this.events);

        let arrPrev = [];
        let arrNext = [];

        let allEvents = calendarApi.getEvents();
        // console.log(allEvents);
        allEvents.forEach(item => {
          // console.log(item.start.indexOf(prevDay));
          if(item.startStr.indexOf(prevDay) === 0) {
            // console.log(item);
            arrPrev.push(item);
            this.prevEvents = arrPrev;
          }

          if(item.startStr.indexOf(nextDay) === 0) {
            arrNext.push(item);
            this.nextEvents = arrNext;
          }
        });

        let lstMore = document.querySelector('.layer_more');
        lstMore.classList.add('on');
        this.stateMoreLayer = true;

        let lstMoreW = lstMore.offsetWidth;
        let lstMoreH = lstMore.offsetHeight;

        let winW = window.innerWidth;
        let winH = window.innerHeight;

        // let winST = window.scrollY;
        // let winSL = window.scrollX;

        // console.log(winST, winSL);

        if(info.jsEvent.clientX + lstMoreW + 20 > winW) {
          lstMore.style.left = info.jsEvent.clientX - lstMoreW - 20 + 'px';
        } else {
          lstMore.style.left = info.jsEvent.clientX + 20 + 'px';
        }

        if(info.jsEvent.clientY + lstMoreH + 20 > winH) {
          lstMore.style.top = info.jsEvent.clientY - lstMoreH - 20 + 'px';
        } else {
          lstMore.style.top = info.jsEvent.clientY + 20 + 'px';
        }

        let weekList = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        let day = new Date(info.date).getDay();
        let date = new Date(info.date).getDate();
        let dayOfWeek = weekList[day];

        this.moreEvent.date = date;
        this.moreEvent.day = dayOfWeek;
        this.moreEvent.lst = info.allSegs;

        // return false;
    },
    selectedDate(info) {
      this.$emit('selectedDate', info);
    },

    enterScheduleLayer() {
        this.stateScheduleLayer = false;
        this.stateMoreLayer = false;
    },
    leaveScheduleLayer() {
        this.stateScheduleLayer = true;
        this.stateMoreLayer = true;
    },

    enterMoreLayer() {
        this.stateMoreLayer = false;
    },
    leaveMoreLayer() {
        this.stateMoreLayer = true;
    },

    enterMoreEvent() {
        this.stateEventLeave = false;
    },
    leaveMoreEvent() {
        this.stateEventLeave = true;
    },
    

    hideScheduleLayer() {
        // console.log('hideScheduleLayer');
        if(this.$refs.layer_schedule) {
            this.$refs.layer_schedule.classList.remove('on');
        }
        this.stateScheduleLayer = false;
        this.stateEventLeave = false;
    },
    hideMoreLayer() {
        // console.log('hideMoreLayer');
        if(this.$refs.layer_more) {
            this.$refs.layer_more.classList.remove('on');
        }
        this.stateMoreLayer = false;
    },


    /** custom */
    fn_handleClickDate: function () {
      console.log('handle click')
    }
  },
}
</script>