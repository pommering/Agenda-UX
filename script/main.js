document.addEventListener('DOMContentLoaded', function() {
	function GetDaysCalendar(mes,ano){
		const monthsBR = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO','JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'];
		document.getElementById('mes').innerHTML = monthsBR[mes];
		document.getElementById('ano').innerHTML = ano;
		const tableDays = document.getElementById('dias');
		let month = mes;
		let year = ano;

		let firtsDayOfWeek = new Date(year,month,1).getDay()-1;
		let getLastDayThisMonth = new Date(year,month+1,0).getDate();


		for(var i = -firtsDayOfWeek,index = 0; i < (42-firtsDayOfWeek); i++,index++){
			let dt = new Date(year,month,i);
			let atualDate = new Date();
			var dayTable = tableDays.getElementsByTagName('td')[index];
			dayTable.classList.remove('mes-anterior');
			dayTable.classList.remove('proximo-mes');
			dayTable.classList.remove('dia-atual');
			dayTable.innerHTML = dt.getDate();

			if(dt.getFullYear() == atualDate.getFullYear() && dt.getMonth() == atualDate.getMonth() && dt.getDate() == atualDate.getDate()){
				dayTable.classList.add("dia-atual");
			}
			if(i < 1){
				dayTable.classList.add("mes-anterior");
			}
			if(i > getLastDayThisMonth){
				dayTable.classList.add("proximo-mes");
			}	
		}
	}
	var dt = new Date();
	var month = dt.getMonth();
	var year = dt.getFullYear();
	GetDaysCalendar(month,year);

	var botao_proximo = document.getElementById('btn_next');
	var botao_anterior = document.getElementById('btn_prev');
	botao_proximo.onclick = function(){
		month++;
		if(month > 11){
			month = 0;
			year++;
		}
		
		GetDaysCalendar(month,year);
	};
	botao_anterior.onclick = function(){
		month--;
		if(month < 0){
			month = 11;
			year--;
		}
		GetDaysCalendar(month,year);
	};
}, false);