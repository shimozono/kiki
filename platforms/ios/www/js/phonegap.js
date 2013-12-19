
// ■DB作成
var database;
function onOpenDB() {
	database = sqlitePlugin.openDatabase("savekiki", "1.0", "kiki", 1000000);

}

// ■テーブル作成
function onCreateTable() {
	database.transaction(createTable, onDBAccessError, onCreateTableOk);
}

// ■テーブル作成
function createTable(tx) {
    tx.executeSql( ' CREATE TABLE IF NOT EXISTS PERSON ' +
                           ' (id integer unique, name text) ');
}

// ■テーブル作成失敗
function onDBAccessError(tx, err)
{
    alert("error:" + tx.message);
}

// ■テーブル作成成功
function onCreateTableOk()
{
    alert("ok");
}

// ■データ登録
function onInsertTable() {
	database.transaction(insertTable, onDBAccessError, onCreateTableOk);
}

// ■データ登録
function insertTable(tx) {
    tx.executeSql(
                              'INSERT INTO PERSON ( name ) ' +
                              '          VALUES ( "' + $("#input_name").val() + '" ' +
                              '                 )  '
                              );
}

// ■データ表示
function onShowData() {
	database.transaction(select, onDBAccessError);
}

// ■データ取得
function select(tx) {
	tx.executeSql('SELECT * FROM PERSON ',
                              [],
                              showData,
                              onDBAccessError
                         );
}

// ■データ表示
function showData(tx, results) {
	var rowArray = results.rows;
	
	for(var i = 0 ; i < rowArray.length ; ++i) {
		$("#dataArea").append('<tr><td>' + rowArray.item(i).name + '</td></tr>');
	}
}

function testaaa() {
	alert("test");
}

// ■XMLデータ読み込み
function onLoadXml() {
	loadXml();
}

// ■XML読み込み
function loadXml(){  
	// サーバに対して要求を投げる
	$.ajax({
		// 接続先URL
		url:'http://www53.atpages.jp/rdaiku/oil_list.xml',  
		// メソッドタイプ
		type:'get',  
		// 形式
		dataType:'xml',  
		// タイムアウト
		timeout:10000,  
		// レスポンス解析用コールバックメソッド
		success:parseXml  
	});
}

// ■XMLの解析
function parseXml(xml) {
	// オイルタグを検索
	var itemList = $(xml).find('oil');
	
	// データ出力エリアのjqueryオブジェクトを取得
	var xmlDataArea = $("#xmlDataArea");
	
	// データ出力エリアをクリアする。
	xmlDataArea.empty();
	
	// 各oilタグの中身を出力する
	for(var i = 0 ; i < itemList.length ; ++i) {
		// タグの中身を取得する。
		var name = itemList[i].getElementsByTagName('name')[0].textContent;
		var price = itemList[i].getElementsByTagName('price')[0].textContent;
		
		// 取得したタグの中身を表示するタグを生成する。
		var tag =
			'<tr>' +
				'<td>' + name + '</td>' +
				'<td>' + price + '</td>' +
			'</tr>';
		
		// 作成したタグを出力
		xmlDataArea.append(tag);
	}
	}

// ■パラメータ送信
function onSendParameter() {
	// 入力データを取得
	var word = $("#input_name").val();

	// サーバに対して要求を投げる
	$.ajax({  
		// 接続先URL
		url:'http://public.dejizo.jp/NetDicV09.asmx/SearchDicItemLite',  
		// メソッドタイプ
		type:'post',
		// 送信パラメータ
		data : {
			Dic			: 'EJdict',
			Word		: word,
			Scope		: 'HEADWORD',
			Match		: 'STARTWITH',
			Merge		: 'AND',
			Prof		: 'XHTML',
			PageSize	: '20',
			PageIndex	: '0'
		},
		// 形式
		dataType:'xml',  
		// タイムアウト
		timeout:10000,  
		// レスポンス解析用コールバックメソッド
		success:parseXmlOnSendParameter  
	});
}

// ■XML解析
function parseXmlOnSendParameter(xml) {
	// spanタグを検索
	var itemList = $(xml).find('span');

	// データ出力エリアのjqueryオブジェクトを取得
	var xmlDataArea = $("#xmlDataArea");
	
	// データ出力エリアをクリアする。
	xmlDataArea.empty();
	
	// 各spanタグの中身を出力する
	for(var i = 0 ; i < itemList.length ; ++i) {
		// タグの中身を取得する。
		var name = itemList[i].textContent;
		
		// 取得したタグの中身を表示するタグを生成する。
		var tag =
			'<tr>' +
				'<td>' + name + '</td>' +
			'</tr>';
		
		// 作成したタグを出力
		xmlDataArea.append(tag);
	}
	
}
