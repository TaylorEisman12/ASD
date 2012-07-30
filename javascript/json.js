// Taylor Eisman
// MIU 06/12
// Project 2

var json = {
	"bill1": {
		"category": ["Category:", "Cell"],
		"compName": ["Company Name:", "ATT"],
		"compEmail": ["Company Email:", "salesGuy@att.net"],
		"compWeb": ["Company Website:", "www.att.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2012-01-18"],
		"notes": ["Notes:", "Ask about upgrade."]
	},
	"bill2": {
		"category": ["Category:", "Car"],
		"compName": ["Company Name:", "A+ FCU"],
		"compEmail": ["Company Email:", "loanGal@aplus.com"],
		"compWeb": ["Company Website:", "www.a+fcu.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "50"],
		"date": ["Date Added:", "2011-02-11"],
		"notes": ["Notes:", "Check oil."]
	},
	"bill3": {
		"category": ["Category:", "Rent"],
		"compName": ["Company Name:", "OverLooks"],
		"compEmail": ["Company Email:", "rentDue@apartment.com"],
		"compWeb": ["Company Website:", "www.overlooks.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "Yes"],
		"budgetPercent": ["Budget Percent:", "75"],
		"date": ["Date Added:", "2011-12-21"],
		"notes": ["Notes:", "Call office."]
	},
	"bill4": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "Time Warner"],
		"compEmail": ["Company Email:", "timewarner@time.com"],
		"compWeb": ["Company Website:", "www.timewarner.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "Yes"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2011-02-11"],
		"notes": ["Notes:", "Check for faster internet."]
	},
	"bill5": {
		"category": ["Category:", "Cell"],
		"compName": ["Company Name:", "Tmobile"],
		"compEmail": ["Company Email:", "Tmobile@mobile.com"],
		"compWeb": ["Company Website:", "www.Tmobile.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-11-11"],
		"notes": ["Notes:", "Daughterss cell phone."]
	},
	"bill6": {
		"category": ["Category:", "Cell"],
		"compName": ["Company Name:", "Sprint"],
		"compEmail": ["Company Email:", "sprint@mobile.com"],
		"compWeb": ["Company Website:", "www.Sprint.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-09-11"],
		"notes": ["Notes:", "Son's cell phone."]
	},
	"bill7": {
		"category": ["Category:", "Rent"],
		"compName": ["Company Name:", "Park Place"],
		"compEmail": ["Company Email:", "parkplace@healthcare.com"],
		"compWeb": ["Company Website:", "www.parkplace.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "Yes"],
		"budgetPercent": ["Budget Percent:", "75"],
		"date": ["Date Added:", "2011-04-01"],
		"notes": ["Notes:", "Mom's rest home."]
	},
	"bill8": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "Direct Tv"],
		"compEmail": ["Company Email:", "direct@tv.com"],
		"compWeb": ["Company Website:", "www.directtv.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2012-07-25"],
		"notes": ["Notes:", "Son's dorm room."]
	},
	"bill9": {
		"category": ["Category:", "Rent"],
		"compName": ["Company Name:", "Rent A Center"],
		"compEmail": ["Company Email:", "rent@center.net"],
		"compWeb": ["Company Website:", "www.rentcenter.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-05-13"],
		"notes": ["Notes:", "80inch flatscreen."]
	},
	"bill10": {
		"category": ["Category:", "Car"],
		"compName": ["Company Name:", "Bank Of America"],
		"compEmail": ["Company Email:", "bank@america.com"],
		"compWeb": ["Company Website:", "www.BoA.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "75"],
		"date": ["Date Added:", "2012-02-01"],
		"notes": ["Notes:", "Red corvette."]
	},
	"bill11": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "RoadRunner"],
		"compEmail": ["Company Email:", "roadrunner@roads.com"],
		"compWeb": ["Company Website:", "www.roadrunner.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "Yes"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2011-04-11"],
		"notes": ["Notes:", "Gram grams condo."]
	},
	"bill12": {
		"category": ["Category:", "Car"],
		"compName": ["Company Name:", "Bank of Banks"],
		"compEmail": ["Company Email:", "bank@bank.com"],
		"compWeb": ["Company Website:", "www.bankobank.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "75"],
		"date": ["Date Added:", "2012-08-04"],
		"notes": ["Notes:", "Silver Camaro"]
	},
	"bill13": {
		"category": ["Category:", "Cell"],
		"compName": ["Company Name:", "Verizon"],
		"compEmail": ["Company Email:", "verizon@mobile.com"],
		"compWeb": ["Company Website:", "www.verizon.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2012-10-10"],
		"notes": ["Notes:", "Uncle Timmy's phone."]
	},
	"bill14": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "att"],
		"compEmail": ["Company Email:", "att@cable.com"],
		"compWeb": ["Company Website:", "www.att.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-03-04"],
		"notes": ["Notes:", "Uncle Bob's cable"]
	},
	"bill15": {
		"category": ["Category:", "Rent"],
		"compName": ["Company Name:", "Amazing Lakes"],
		"compEmail": ["Company Email:", "amazinglakes@lakes.com"],
		"compWeb": ["Company Website:", "www.amazinglakes.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "25"],
		"date": ["Date Added:", "2012-06-17"],
		"notes": ["Notes:", "Lake house."]
	},
	"bill16": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "Direct Tv"],
		"compEmail": ["Company Email:", "direct@tv.com"],
		"compWeb": ["Company Website:", "www.directtv.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-06-15"],
		"notes": ["Notes:", "Lake house cable."]
	},
	"bill17": {
		"category": ["Category:", "Car"],
		"compName": ["Company Name:", "Kawasaki"],
		"compEmail": ["Company Email:", "kawasaki@aTv.com"],
		"compWeb": ["Company Website:", "www.kawasaki.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-11-10"],
		"notes": ["Notes:", "Atv at lake house."]
	},
	"bill18": {
		"category": ["Category:", "Cable"],
		"compName": ["Company Name:", "Sandy's Cable"],
		"compEmail": ["Company Email:", "sandy@cable.com"],
		"compWeb": ["Company Website:", "www.sandycable.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "Yes"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-03-06"],
		"notes": ["Notes:", "Cable at my condo."]
	},
	"bill19": {
		"category": ["Category:", "Rent"],
		"compName": ["Company Name:", "Condo4Life"],
		"compEmail": ["Company Email:", "condo@life.com"],
		"compWeb": ["Company Website:", "www.condo4life.com"],
		"payBy": ["Pay By:", "Mail"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "50"],
		"date": ["Date Added:", "2012-02-19"],
		"notes": ["Notes:", "Austin condo."]
	},
	"bill20": {
		"category": ["Category:", "Cell"],
		"compName": ["Company Name:", "Cricket"],
		"compEmail": ["Company Email:", "cricket@wireless.com"],
		"compWeb": ["Company Website:", "www.cricket.com"],
		"payBy": ["Pay By:", "Internet"],
		"pastDue": ["Past Due:", "No"],
		"budgetPercent": ["Budget Percent:", "15"],
		"date": ["Date Added:", "2012-05-11"],
		"notes": ["Notes:", "Hunting lounge spare phone."]
	}
}