const StopEventPropagation = (e) => {
    if (!e) return;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
};
const Calendar = (id) => ({
    id: id,
    data: [], //{Id: "", Title: "", Content: "", Start: "", ?End: ""}
    el: undefined,
    y: undefined,
    m: undefined,
    activeTab: 1,
    showCalendarView: true,
    eventSelectBtn: 'Register',
    listColors: ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'gray'],
    viewColors: ['blue-alt', 'indigo-soft', 'purple-alt', 'pink-soft', 'red-alt', 'orange-alt', 'yellow-soft', 'green-alt', 'teal-soft', 'cyan-alt'],
    onDateClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
    },
    onEventClick(e) {
        StopEventPropagation(e);
        const el = e.srcElement;
        let divEl = document.createRange().createContextualFragment(`
            <h4>Event - ${moment($(el).attr('time')).format('MMM DD')} - ${el.textContent}</h4>
            <p class="mb-2">${el.title}</p>
            <button class="btn btn-theme-red registerEvent spinner-btn">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ${this.eventSelectBtn}</button>
            `);
        $('#calendarView #selectedEvents').html(divEl);
        $('#calendarView #selectedEvents .registerEvent').on('click', function (e) {
            if (typeof registerEventFn !== 'undefined' && $.isFunction(registerEventFn)) {
                registerEventFn(e.target);
            }
        });
    },
    bindData(events) {
        this.data = events.sort((a, b) => {
            if (a.start < b.start) return -1;
            if (a.start > b.start) return 1;
            return 0;
        });
    },
    renderEvents() {
        if (!this.data || this.data.length <= 0) return;
        const lis = this.el.querySelectorAll(`#${this.id} .days .inside`);
        let y = this.el.querySelector('.month-year .year').innerText;
        let m = lis[0].querySelector('.date').getAttribute('month');
        const calListRow = this.el.querySelector('#calendarList .row');
        lis.forEach((li) => {
            let d = li.innerText;
            let divEvents = li.querySelector('.events');
            li.onclick = this.onDateClick;
            this.data.forEach((ev) => {
                let evStart = moment(ev.start);
                let evEnd = moment(ev.end) || null;
                if (evStart.year() == y && evStart.month() == m && evStart.date() == d) {
                    //CalView
                    let evClassv = this.viewColors[Math.floor(Math.random() * this.viewColors.length)];
                    let frgEvent = document.createRange().createContextualFragment(`
                        <div time="${ev.start}" class="event bg-${evClassv}" data-event-id="${ev.id}" title="${evStart.format('h:mma')} - ${evEnd.format('h:mma')}: ${ev.content}">${evStart.format('h:mma')} ${ev.title}</div>
                    `);
                    divEvents.appendChild(frgEvent);
                    let divEvent = divEvents.querySelector(`.event[data-event-id='${ev.id}']`);
                    divEvent.onclick = this.onEventClick;

                    //CalList
                    let evClassl = this.listColors[Math.floor(Math.random() * this.listColors.length)];
                    if (calListRow.querySelector('#dayListChild-' + evStart.date())) {
                        let childEvent = calListRow.querySelector('#dayListChild-' + evStart.date());
                        let frgListEventBox = document.createRange().createContextualFragment(`
                            <div class="card lift border-bottom-lg border-${evClassl} mb-2 w-100">
                                <a class="d-md-flex justify-content-between list-group-item-action p-3 collapsed" data-toggle="collapse" href="#collapse-${ev.id}" aria-expanded="false" aria-controls="collapse-${ev.id}">
                                    <h6 class="mb-0"><i class="accordion-heading-arrow mr-1" data-feather="chevron-up"></i>${ev.title}</h6>
                                    <div class="text-gray-400 flex-shrink-0">
                                        ${evStart.format('h:mmA')}${evEnd ? ' - ' + evEnd.format('h:mmA') : ''}
                                    </div>
                                </a>
                                <div id="collapse-${ev.id}" class="collapse">
                                    <div class="card-body pt-0 pb-3">
                                        <span>
                                            ${ev.content}
                                        </span>
                                        <div class="text-center">
                                            <button class="btn btn-theme-red mt-3 registerEvent spinner-btn" data-event-id="${ev.id}" data-event-title="${ev.title}" data-event-date="${evStart.format('YYYY-MM-DD hh:mmA')}">
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                ${this.eventSelectBtn}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);
                        childEvent.appendChild(frgListEventBox);
                    }
                    else {
                        let frgListEvent = document.createRange().createContextualFragment(`
                            <div class="col-lg-10 mx-auto">
                                <div class="row no-gutters">
                                    <div class="col-md-1 px-2 mb-2">
                                        <span class="d-md-block d-inline">${evStart.date()}</span>
                                        <span class="d-md-block d-inline">${evStart.format('ddd')}</span>
                                    </div>
                                    <div class="col-md-11 px-1" id="dayListChild-${evStart.date()}">
                                        <div class="card lift border-bottom-lg border-${evClassl} mb-2 w-100">
                                            <a class="d-md-flex justify-content-between list-group-item-action p-3 collapsed" data-toggle="collapse" href="#collapse-${ev.id}" aria-expanded="false" aria-controls="collapse-${ev.id}">
                                                <h6 class="mb-0"><i class="accordion-heading-arrow mr-1" data-feather="chevron-up"></i>${ev.title}</h6>
                                                <div class="text-gray-400 flex-shrink-0">
                                                    ${evStart.format('h:mmA')}${evEnd ? ' - ' + evEnd.format('h:mmA') : ''}
                                                </div>
                                            </a>
                                            <div id="collapse-${ev.id}" class="collapse">
                                                <div class="card-body pt-0 pb-3">
                                                    <span>
                                                        ${ev.content}
                                                    </span>
                                                    <div class="text-center">
                                                        <button class="btn btn-theme-red mt-3 registerEvent spinner-btn" data-event-id="${ev.id}" data-event-title="${ev.title}" data-event-date="${evStart.format('YYYY-MM-DD hh:mmA')}">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ${this.eventSelectBtn}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        `);
                        calListRow.appendChild(frgListEvent);
                    }
                }
            });
        });
        if (this.el.querySelector('.registerEvent')) {
            $(this.el).find('.registerEvent').on('click', function (e) {
                if (typeof registerEventFn !== 'undefined' && $.isFunction(registerEventFn)) {
                    registerEventFn(e.target);
                }
            });
        } else {
            let frgListEmptyEventBox = document.createRange().createContextualFragment(`
                            <div class="col-lg-10 mx-auto text-center">No Events</div>
                        `);
            calListRow.appendChild(frgListEmptyEventBox);
        }
        feather.replace();
    },
    render(y, m, activeTab) {
        //-------------------------------------------------------------------------------------------
        //first time when you call render() without params, it is going to default to current date.
        //this logic here is to make sure if you re-render by calling render() without any param again,
        //if the calendar is already looking at some other month, then it will get the updated data, but
        //the calendar will not jump back to current month and stay at the previous month you are looking at.
        //this is useful when server side has updated events, calendar can re-bindData() and re-render() 
        //itself correctly to reflect any changes.
        if (isNaN(y) && isNaN(this.y)) {
            this.y = moment().year();
        } else if ((!isNaN(y) && isNaN(this.y)) || (!isNaN(y) && !isNaN(this.y))) {
            this.y = y > 1600 ? y : moment().year(); //calendar doesn't exist before 1600! :)
        }
        if (isNaN(m) && isNaN(this.m)) {
            this.m = moment().month();
        } else if ((!isNaN(m) && isNaN(this.m)) || (!isNaN(m) && !isNaN(this.m))) {
            this.m = m >= 0 ? m : moment().month(); //momentjs month starts from 0-11
        }
        if (isNaN(activeTab) && isNaN(this.activeTab)) {
            this.activeTab = 0;
        } else if (!isNaN(activeTab)) {
            this.activeTab = activeTab;
        }
        //------------------------------------------------------------------------------------------

        const d = moment().year(this.y).month(this.m).date(1); //first date of month
        const now = moment();

        //------------------------------------------------------------------------------------------
        //--- Main View ----------------------------------------------------------------------------
        const frgCalMain = document.createRange().createContextualFragment(`
        <ul class="nav nav-tabs" role="tablist"></ul>
        <div class="tab-content">
            <div class="tab-pane fade${this.activeTab == 0 ? ' show active' : ''}" id="paneCalendarView" role="tabpanel" aria-labelledby="tabCalendarView">
                <div id="calendarView"></div>
            </div>
            <div class="tab-pane fade${this.activeTab == 1 ? ' show active' : ''}" id="paneCalendarList" role="tabpanel" aria-labelledby="tabCalendarList">
                <div id="calendarList"></div>
            </div>
        </div>
        `);

        if (this.showCalendarView) {
            var frgLiTabView = document.createRange().createContextualFragment(`
                <li class="nav-item">
                    <a class="nav-link${this.activeTab == 0 ? ' active' : ''}" id="tabCalendarView" data-tabIndex="0" data-toggle="tab" href="#paneCalendarView" role="tab" aria-controls="paneCalendarView" aria-selected="${this.activeTab == 0 ? 'true' : 'false'}">Calendar</a>
                </li>`);
            frgCalMain.querySelector('ul').appendChild(frgLiTabView);
        }

        var frgLiTabList = document.createRange().createContextualFragment(`
            <li class="nav-item">
                <a class="nav-link${this.activeTab == 1 ? ' active' : ''}" id="tabCalendarList" data-tabIndex="1" data-toggle="tab" href="#paneCalendarList" role="tab" aria-controls="paneCalendarList" aria-selected="${this.activeTab == 1 ? 'true' : 'false'}">Event List</a>
            </li>`);
        frgCalMain.querySelector('ul').appendChild(frgLiTabList);


        this.el = document.getElementById(this.id);
        this.el.classList.add("container", "p-2");
        this.el.innerHTML = ''; //replacing
        this.el.appendChild(frgCalMain);

        //------------------------------------------------------------------------------------------
        //--- Calendar View ------------------------------------------------------------------------
        const frgCalView = document.createRange().createContextualFragment(`
        <div class="calendar card-body noselect p-4">
            <div class="month-year-btn d-flex justify-content-center align-items-center mb-2">
                <a class="prev-month"><i class="fas fa-caret-left fa-lg m-3"></i></a>
                <div class="month-year d-flex justify-content-center align-items-center">
                    <div class="month mb-2 mr-2">${moment().month(this.m).format('MMMM')}</div>
                    <div class="year mb-2">${this.y}</div>
                </div>
                <a class="next-month"><i class="fas fa-caret-right fa-lg m-3" aria-hidden="true"></i></a>
            </div>
            <ol class="day-names list-unstyled">
                <li><h6 class="initials">Sun</h6></li>
                <li><h6 class="initials">Mon</h6></li>
                <li><h6 class="initials">Tue</h6></li>
                <li><h6 class="initials">Wed</h6></li>
                <li><h6 class="initials">Thu</h6></li>
                <li><h6 class="initials">Fri</h6></li>
                <li><h6 class="initials">Sat</h6></li>
            </ol>
        </div>
        `);
        const isSameDate = (d1, d2) => d1.format('YYYY-MM-DD') == d2.format('YYYY-MM-DD');
        let frgWeek;
        d.day(-1); //move date to the oldest Sunday, so that it lines up with the calendar layout
        for (let i = 0; i < 5; i++) { //loop thru 35 boxes on the calendar month
            frgWeek = document.createRange().createContextualFragment(`
            <ol class="days list-unstyled" week="${d.week()}">
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
                <li class="${d.add(1, 'd'), this.m != d.month() ? ' outside' : 'inside'}${isSameDate(d, now) ? ' today' : ''}"><div month="${d.month()}" class="date">${d.format('D')}</div><div class="events"></div></li>
            </ol>
            `);
            frgCalView.querySelector('.calendar').appendChild(frgWeek);
        }
        let frgEvent = document.createRange().createContextualFragment(`
            <div id="selectedEvents">
            </div>`);
        frgCalView.querySelector('.calendar').appendChild(frgEvent);

        const elCalView = this.el.querySelector('#calendarView');
        elCalView.classList.add('card');
        elCalView.innerHTML = ''; //replacing
        elCalView.appendChild(frgCalView);

        //------------------------------------------------------------------------------------------
        //--- Calendar List ------------------------------------------------------------------------
        const frgCalList = document.createRange().createContextualFragment(`
        <div class="card-body">
            <div class="month-year-btn d-flex justify-content-center align-items-center mb-2">
                <a class="prev-month"><i class="fas fa-caret-left fa-lg m-3"></i></a>
                <div class="month-year d-flex justify-content-center align-items-center">
                    <div class="month mb-2 mr-2">${moment().month(this.m).format('MMMM')}</div>
                    <div class="year mb-2">${this.y}</div>
                </div>
                <a class="next-month"><i class="fas fa-caret-right fa-lg m-3" aria-hidden="true"></i></a>
            </div>
            <div class="row">
            </div>
        </div>
        `);
        const elCalList = this.el.querySelector('#calendarList');
        elCalList.classList.add('card');
        elCalList.innerHTML = ''; //replacing
        elCalList.appendChild(frgCalList);

        var allPrev = document.querySelectorAll('.prev-month')
        for (i = 0; i < allPrev.length; i++) {
            allPrev[i].onclick = () => {
                const dp = moment().year(this.y).month(this.m).date(1).subtract(1, 'month');
                const activeTab = this.el.querySelector('ul.nav-tabs a.nav-link.active').getAttribute('data-tabIndex');
                this.render(dp.year(), dp.month(), activeTab);
            };
        }

        var allNext = document.querySelectorAll('.next-month')
        for (i = 0; i < allNext.length; i++) {
            allNext[i].onclick = () => {
                const dn = moment().year(this.y).month(this.m).date(1).add(1, 'month');
                const activeTab = this.el.querySelector('ul.nav-tabs a.nav-link.active').getAttribute('data-tabIndex');
                this.render(dn.year(), dn.month(), activeTab);
            };
        }

        this.renderEvents();
    }
});