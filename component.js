AJS.$('#columns-1').on({
	"aui-dropdown2-item-check": function(e) {
		changeSelectorState($(e.target).attr('id'), columns1, true);
	},
	"aui-dropdown2-item-uncheck": function(e) {
		changeSelectorState($(e.target).attr('id'), columns1, false);
	}
});
AJS.$("#columns-1").on({
	"aui-dropdown2-show": function() {
		AJS.$('#column-1-search').on('input', {s: $(this), c: columns1}, searchSelector);
	},
	"aui-dropdown2-hide": function() {
		AJS.$('#column-1-search').val('').off('input', {s: $(this), c: columns1}, searchSelector);
	}
});
AJS.$('#columns-2').on({
	"aui-dropdown2-item-check": function(e) {
		changeSelectorState($(e.target).attr('id'), columns2, true);
	},
	"aui-dropdown2-item-uncheck": function(e) {
		changeSelectorState($(e.target).attr('id'), columns2, false);
	}
});
AJS.$("#columns-2").on({
	"aui-dropdown2-show": function() {
		AJS.$('#column-2-search').on('input', {s: $(this), c: columns2}, searchSelector);
	},
	"aui-dropdown2-hide": function() {
		AJS.$('#column-2-search').val('').off('input', {s: $(this), c: columns2}, searchSelector);
	}
});

function fillColumnsSelector(selector, columns) {
	var enabled = ['<ul>'],
		disabled = ['<ul>'],
		result;

	columns.forEach(function(column) {
		result = disabled;
		if(column.selected){
			result = enabled;
		}
		result.push('<li><a class="aui-dropdown2-checkbox interactive aui-dropdown2-interactive');
		if (column.selected)
			result.push(' checked');
		result.push('" id="');
		result.push(column.id);
		result.push('">');
		result.push(column.name);
		result.push('</a></li>');
	});
	enabled.push('</ul>');
	disabled.push('</ul>');
	selector.find( ".enabled-list" ).html(enabled.join(''));
	selector.find( ".disabled-list" ).html(disabled.join(''));
}

function changeSelectorState(id, columns, value) {
	// console.log(id, value);
	columns.forEach(function(column) {
		if(column.id == id){
			column.selected = value;
		}
	});
}

function searchSelector(e) {
	var columns = e.data.c,
		selector = e.data.s,
		result = [];
	columns.forEach(function(column) {
		if(column.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
			// console.log('found:', column.name);
			result.push(column);
		}
	});
	fillColumnsSelector(selector, result);
}