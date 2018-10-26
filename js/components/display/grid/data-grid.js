/**
 * The grid is a component which has features for user to create dynamic data .
 * It can be used by user to create json data which can be used by other
 * integrated components as its input .
 */

var GridType = {
	EMPTY : 0,
	STRIPED_EMPTY : 1,
	SIMPLE : 2,
	STRIPED_DATA : 3,
	STRIPED_EDITABLE : 4
}

/**
 * The below is how data object should be 1) HeaderLength should be data length . *
 * Data_Prototype : { header : [ { label : '', type : .. },{ }... ], data : [
 * [0][0],[0][1]... [1][0],[1][0]... . . ] }
 */

var ColType = {
	NUMERIC : 0,
	DATE : 1,
	STRING : 2
}

var CsvSpec = {
	REMOVE_QUOTES : 0,
}
function DataGrid(id, rows, cols, opt_data) {
	var containerElement_;
	var settings_ = {
		rows : 10,
		columns : 10,
		readonly : true,
		gridType : GridType.EMPTY,
		headerIconDisplay : false,
		basicValidate : false
	}
	var data_;

	function init_() {
		// 'id' element should be a 'div' element and it should be unique.
		if (id != null || id != undefined) {
			if (typeof (id) != "string") {
				throw "Type of 'id' should be STRING";
			}
			// TODO : Check if its a div element without child
			var element = $('#' + id).get();
			if ($(element).is('DIV') && $(element).children().length == 0) {
				containerElement_ = element[0];
			} else {
				containerElement_ = $("<div></div>").attr("id", id).appendTo(
						document.body);
			}
			$(containerElement_).addClass('grid');
		}
		settings_['rows'] = (rows != undefined && rows != null) ? rows
				: settings_['rows'];
		settings_['columns'] = (cols != undefined && cols != null) ? cols
				: settings_['columns'];

		// Component data should not be 'null' or 'undefined'...
		if (opt_data != undefined && opt_data != null) {
			data_ = opt_data;
			this.drawGrid(opt_data);
		}

	}

	function validateData_(headerLength, rowIndex) {

		if (headerLength != rowLength) {
			throw 'invalid data length';
		}
	}

	this.drawGrid = function(data) {
		data_ = data;
		var headerCount = 0;
		if (data_['header']) {
			// iterate headers
			for (x in data_['header']) {
				var ele = $('<div>'+ data_['header'][x]['label'] +'</div>').addClass('grid-header'); 
				$(containerElement_).append(ele);
				headerCount++;
			}
		} else {
			throw "Invalid Header info";
		}
		if (data_['data']) {
			// iterate data based on the header count that was available .
			for (var x = 0; x < data_['data'].length; x++) {
				for (var y = 0; y < headerCount; y++) {
					if (settings_['basicValidate']) {
						/* TODO : make call to validateData function */
					}
					var ele = $('<div>'+ data_['data'][x][y] +'</div>').addClass('grid-data');
					$(ele).attr('contenteditable','true');
					$(containerElement_).append(ele);
				}
			}
		} else {
			throw "Invalid DATA";
		}
	}

	// return the data by creating a new object .
	this.getGridData = function() {
		return Object.assign({}, data_);
	}
	init_.call(this);
}