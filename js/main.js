let climates = {28 : "cloudy.svg",4: "cloudy.svg"}
    	
    	$(document).ready(function(){

    		$.ajax({
    			url: "https://api.hgbrasil.com/weather?format=json-cors&woeid=455845",
    			method: "GET",
    			dataType: 'json',
    		}).done(function(msg){
    			
    			let image =  `assets/${climates[msg.results.condition_code]}`;

    			if(typeof climates[msg.results.condition_code] === 'undefined') {
    				image = `assets/load.svg`;
    			}

    			$('.info header img').attr('src',image)
    			$('.temp').text(`${msg.results.temp}°C`)
    		}).fail(function(jqXHR, textStatus, msg){
    			alert(textStatus);
    		});	
    	});

    	const monthsBR = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
    	const monthElement = document.getElementById('month');
    	const yearElement = document.getElementById('year');
    	const nextElement = document.getElementById('next-month');
			const previElement = document.getElementById('prev-month');
			const tableDays = document.getElementById('tableDays');
    	

    	let date = new Date();
    	let month = date.getMonth();
    	let year = date.getFullYear()
    	

    	nextElement.onclick = function(){
    		month++;
    		if(month > 11){
    			month = 0;
    			year++;
    		}
				monthElement.innerText = monthsBR[month];
				handlerUpdateCalendar(month, year);
			};
			
			previElement.onclick = function(){
				month--;
				if(month < 0){
					month = 11;
					year--;
				}
				monthElement.innerText = monthsBR[month];
				handlerUpdateCalendar(month, year);
			};

			function handlerUpdateCalendar(month, year){
				let firtsDayOfWeek = new Date(year,month,0).getDay();
				let getLastDayThisMonth = new Date(year,month+1,0).getDate();


				for(var i = -firtsDayOfWeek,index = 0; i < (42-firtsDayOfWeek); i++,index++){
					const dayTable = tableDays.getElementsByTagName('td')[index];
					dayTable.classList.remove('outherMount');
					dayTable.innerText =  ("0" + new Date(year,month,i).getDate()).slice(-2);

					(i < 1) && dayTable.classList.add("outherMount");
				
					(i > getLastDayThisMonth) && dayTable.classList.add("outherMount");
					
				}

				return [firtsDayOfWeek, getLastDayThisMonth];
			}