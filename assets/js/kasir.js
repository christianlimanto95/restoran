var get_all_menu_ajax=null;var mode_kembalian=!1;var dialogConfirmBayarShown=!1;var printer_found=null;$(function(){$(document).on("keydown click",".qty-add",function(e){if((e.type=="keydown"&&e.which==13)||e.type=="click"){add_to_table();initialize()}});$(window).on("keydown",function(e){switch(e.which){case 13:if(dialogConfirmBayarShown){do_transaksi()}else{nextTabIndex(e)}
break;case 112:e.preventDefault();toggleOptionContainer($(".menu-chosen"));break;case 66:if(e.ctrlKey){showDialogBayar()}
break;case 27:if(mode_kembalian){mode_kembalian=!1;$(".subtotal").html("0")}
break}});$(document).on("click",".option",function(e){nextTabIndex(e)});$(".menu-chosen-text").on("input",function(){get_all_menu()});$(".select-text").on("keydown",function(e){if(e.which==9||e.which==13){var optionActive=$(".option.active");var nama=optionActive.attr("data-nama");var harga=removeThousandSeparator(optionActive.attr("data-harga"));var diskon_nominal=optionActive.attr("data-diskon-nominal");var diskon_satuan=optionActive.attr("data-diskon-satuan");$(".select").attr("data-nama",nama);$(".select").attr("data-harga",harga);$(".select").attr("data-diskon-nominal",diskon_nominal);$(".select").attr("data-diskon-satuan",diskon_satuan);selectOption($(".option.active"));nextTabIndex(e);just_get_all_menu()}});$(".select").on("valueSelected",function(){var id=$(this).attr("data-value");var selectedOption=$(".option[data-value='"+id+"']");var nama=selectedOption.attr("data-nama");var harga=removeThousandSeparator(selectedOption.attr("data-harga"));var diskon_nominal=selectedOption.attr("data-diskon-nominal");var diskon_satuan=selectedOption.attr("data-diskon-satuan");$(this).attr("data-nama",nama);$(this).attr("data-harga",harga);$(this).attr("data-diskon-nominal",diskon_nominal);$(this).attr("data-diskon-satuan",diskon_satuan)});$(document).on("click",".btn-cancel-menu",function(){var tr=$(this).closest("tr");deleteItem(tr)});$(".bayar").on("click",function(){showDialogBayar()});$(".dialog-bayar").on("dialogShown",function(){$(".input-bayar").select()});$(".input-bayar").on("input",function(){var value=parseInt(removeThousandSeparator($(this).val()));if(isNaN(value)){value=0}
value=addThousandSeparator(value+"");$(this).val(value)});$(".input-bayar").on("keydown",function(e){if(e.which==13){e.stopPropagation();$(this).blur();showConfirmDialogBayar()}});$(".btn-bayar").on("click",function(){showConfirmDialogBayar()});$(".btn-confirm-bayar").on("click",function(){do_transaksi()});$('.dialog-confirm-bayar').on("dialogShown",function(){dialogConfirmBayarShown=!0});$(".dialog-confirm-bayar").on("dialogClosed",function(){dialogConfirmBayarShown=!1});get_all_menu(!0)});function script1onload(){}
function script2onload(){}
function script3onload(){}
function do_transaksi(){var menu_array=[];var total=0;var menu="";$(".detail-table tbody tr").each(function(){var menu_id=$(this).attr("data-id");var nama=$(this).attr("data-nama");var qty=$(this).attr("data-qty");var subtotal=$(this).attr("data-subtotal");var diskon_nominal=parseInt($(this).attr("data-diskon-nominal"));var diskon_satuan=$(this).attr("data-diskon-satuan");if(menu!=""){menu+=";"}
menu+=menu_id+"~"+qty;if(diskon_nominal!=0){var subtotal_before_disc=0;var disc_label='disc';var disc_value='';if(diskon_satuan=="2"){subtotal_before_disc=parseInt(subtotal)*100/(100-diskon_nominal);disc_label='disc '+diskon_nominal+'%';disc_value='-'+(subtotal_before_disc*diskon_nominal/100)}else{subtotal_before_disc=parseInt(subtotal)+(parseInt(qty)*diskon_nominal);disc_value='-'+(parseInt(qty)*diskon_nominal)}
menu_array.push(pad('   ',qty,!0)+' '+pad('                    ',nama,!1)+' '+pad('       ',subtotal_before_disc+'',!0)+'\x0A');menu_array.push('    '+pad('                    ',disc_label,!1)+' '+pad('       ',disc_value,!0)+'\x0A')}else{menu_array.push(pad('   ',qty,!0)+' '+pad('                    ',nama,!1)+' '+pad('       ',subtotal,!0)+'\x0A')}
total+=parseInt(subtotal)});ajaxCall(do_transaksi_url,{menu:menu},function(json){var result=jQuery.parseJSON(json);var h_transaksi_id=result.h_transaksi_id;var d=new Date();var day=d.getDate()+'';var month=(d.getMonth()+1)+'';var year=d.getFullYear()+'';var date=pad('00',day,!0)+'-'+pad('00',month,!0)+'-'+year;var hour=d.getHours()+'';var min=d.getMinutes()+'';var sec=d.getSeconds()+'';var time=pad('00',hour,!0)+':'+pad('00',min,!0)+':'+pad('00',sec,!0);var grandtotal=removeThousandSeparator($(".subtotal").attr("data-value"));var bayar=removeThousandSeparator($(".dialog-confirm-bayar-bayar").html());var kembali=removeThousandSeparator($(".dialog-confirm-bayar-kembali").html());var args={h_transaksi_id:h_transaksi_id,date:date,time:time,total:total,grandtotal:grandtotal,bayar:bayar,kembali:kembali,menu_array:menu_array};if(qz.websocket.isActive()){print(printer_found,args)}else{qz.websocket.connect().then(function(){return qz.printers.find("pos58 printer(4)")}).then(function(printer){printer_found=printer;print(printer,args)}).catch(function(e){console.error(e)})}
closeDialog();showNotification("Transaksi Berhasil");var kembali=addThousandSeparator($(".dialog-confirm-bayar").attr("data-kembali"));$(".subtotal").attr("data-value","0");$(".subtotal").html(kembali);mode_kembalian=!0;initialize();$(".detail-table tbody").html("")})}
function print(printer,args){var config=qz.configs.create(printer);var data=['\x1B'+'\x40','\x1B'+'\x61'+'\x31','DAPUR BABI'+'\x0A','Spesialis Mie Babi dan Kwetiau'+'\x0A','Jl. Siwalankerto 147'+'\x0A','HP : 081232287668','\x0A','\x0A','TAX INVOICE'+'\x0A','\x0A','\x1B'+'\x61'+'\x30','No. Nota #'+args.h_transaksi_id+'\x0A',args.date+'  '+args.time+'\x0A'+'\x0A','QTY ITEM                   TOTAL'+'\x0A'];Array.prototype.push.apply(data,args.menu_array);Array.prototype.push.apply(data,['\x0A','TOTAL                    '+pad('       ',args.total+'',!0)+'\x0A','TAX 10%                  '+pad('       ',parseInt((args.total/10))+'',!0)+'\x0A','\x0A','\x1B'+'\x45'+'\x0D','GRAND TOTAL              '+pad('       ',args.grandtotal,!0)+'\x0A','\x1B'+'\x45'+'\x0A','BAYAR                    '+pad('       ',args.bayar,!0)+'\x0A','KEMBALI                  '+pad('       ',args.kembali,!0)+'\x0A','\x0A'+'\x0A','--------------------------------'+'\x0A','\x0A','\x1B'+'\x61'+'\x31','Terima Kasih atas kunjungan Anda.','\x0A'+'\x0A'+'\x0A'+'\x0A','\x1B'+'\x69','\x10'+'\x14'+'\x01'+'\x00'+'\x05',]);return qz.print(config,data)}
function initialize(){just_get_all_menu(!0);selectOption($(".option").first());$(".qty").val(1)}
function showDialogBayar(){var subtotal=parseInt($(".subtotal").attr("data-value"));if(subtotal==0){showNotification("Pesanan Belum Diinputkan")}else{var dialogBayar=$(".dialog-bayar");dialogBayar.attr("data-total",subtotal);$(".dialog-bayar-total").html(addThousandSeparator(subtotal+""));$(".input-bayar").val(0);showDialog(dialogBayar)}}
function showConfirmDialogBayar(){var total=parseInt($(".dialog-bayar").attr("data-total"));var bayar=parseInt(removeThousandSeparator($(".input-bayar").val()));if(bayar<total){showNotification("Uang Tidak Cukup");$(".input-bayar").select()}else{var dialogConfirmBayar=$(".dialog-confirm-bayar");dialogConfirmBayar.attr("data-total",total);dialogConfirmBayar.attr("data-bayar",bayar);var kembali=bayar-total;$(".dialog-confirm-bayar-total").html(addThousandSeparator(total+""));$(".dialog-confirm-bayar-bayar").html(addThousandSeparator(bayar+""));$(".dialog-confirm-bayar-kembali").html(addThousandSeparator(kembali+""));dialogConfirmBayar.attr("data-kembali",kembali);showDialog(dialogConfirmBayar)}}
function get_all_menu(first){var value=$(".menu-chosen-text").val().trim();if(get_all_menu_ajax!=null){get_all_menu_ajax.abort()}
get_all_menu_ajax=ajaxCall(get_all_menu_url,{keyword:value},function(json){var result=jQuery.parseJSON(json);var data=result.data;var iLength=data.length;var element="";for(var i=0;i<iLength;i++){element+="<div class='menu-option option tabindex-exception' data-value='"+data[i].menu_id+"' tabindex='"+(i+1)+"' data-nama='"+data[i].menu_nama+"' data-harga='"+data[i].menu_harga+"' data-diskon-nominal='"+data[i].diskon_nominal+"' data-diskon-satuan='"+data[i].diskon_satuan+"'>"+data[i].menu_id+" - "+data[i].menu_nama+" - "+data[i].menu_harga+"</div>"}
$(".menu-option-container").html(element);if(first){var optionFirst=$(".option").first();var nama=optionFirst.attr("data-nama");var harga=optionFirst.attr("data-harga").replace(".","");var diskon_nominal=optionFirst.attr("data-diskon-nominal");var diskon_satuan=optionFirst.attr("data-diskon-satuan");$(".select").attr("data-nama",nama);$(".select").attr("data-harga",harga);$(".select").attr("data-diskon-nominal",diskon_nominal);$(".select").attr("data-diskon-satuan",diskon_satuan);selectOption(optionFirst)}else{$(".menu-chosen .option-container").addClass("show");$("body").addClass("option-container-show")}
if(iLength>0){setOptionActive($(".select"),data[0].menu_id)}})}
function just_get_all_menu(){if(get_all_menu_ajax!=null){get_all_menu_ajax.abort()}
get_all_menu_ajax=ajaxCall(get_all_menu_url,{keyword:""},function(json){var result=jQuery.parseJSON(json);var data=result.data;var iLength=data.length;var element="";for(var i=0;i<iLength;i++){element+="<div class='menu-option option tabindex-exception' data-value='"+data[i].menu_id+"' data-nama='"+data[i].menu_nama+"' data-harga='"+data[i].menu_harga+"' data-diskon-nominal='"+data[i].diskon_nominal+"' data-diskon-satuan='"+data[i].diskon_satuan+"' tabindex='"+(i+1)+"'>"+data[i].menu_id+" - "+data[i].menu_nama+" - "+data[i].menu_harga+"</div>"}
$(".menu-option-container").html(element)})}
function add_to_table(){var id=$(".select").attr("data-value");var nama=$(".select").attr("data-nama");var harga=parseInt($(".select").attr("data-harga"));var qty=parseInt($(".qty").val());var diskon_nominal=parseInt($(".select").attr("data-diskon-nominal"));var diskon_satuan=$(".select").attr("data-diskon-satuan");var diskon=diskon_nominal;if(diskon!=0){if(diskon_satuan=="1"){diskon="-"+addThousandSeparator(diskon_nominal*qty+"")}else{diskon="-"+diskon_nominal+"%"}}
var subtotal=qty*harga;if(diskon_nominal!=0){if(diskon_satuan=="1"){subtotal-=diskon_nominal*qty}else{subtotal-=diskon_nominal*subtotal/100}}
var tbodyTR=$(".detail-table tbody tr");var iLength=tbodyTR.length;for(var i=0;i<iLength;i++){if(tbodyTR[i].getAttribute("data-id")==id){var tdQty=$(tbodyTR[i]).find("td:nth-child(4)");var currentQty=parseInt(tdQty.html());currentQty+=qty;$(tbodyTR[i]).attr("data-qty",currentQty);tdQty.html(currentQty);if(diskon_satuan=="1"){var tdDiskon=$(tbodyTR[i]).find("td:nth-child(5)");var currentDiskon=parseInt(tdDiskon.html().replace(".","").replace("-","").replace("%",""));currentDiskon+=diskon_nominal;tdDiskon.html("-"+addThousandSeparator(currentDiskon+""));$(tbodyTR[i]).attr("data-diskon-nominal",currentDiskon)}
var tdSubtotal=$(tbodyTR[i]).find("td:nth-child(6)");var currentSubtotal=parseInt(tdSubtotal.html().replace(".",""));currentSubtotal+=subtotal;tdSubtotal.html(addThousandSeparator(currentSubtotal+""));$(tbodyTR[i]).attr("data-subtotal",currentSubtotal);setTotal();return}}
var element="";element+="<tr data-id='"+id+"' data-nama='"+nama+"' data-subtotal='"+subtotal+"' data-qty='"+qty+"' data-diskon-nominal='"+diskon_nominal+"' data-diskon-satuan='"+diskon_satuan+"'>";element+="<td>"+id+"</td>";element+="<td>"+nama+"</td>";element+="<td>"+addThousandSeparator(harga+"")+"</td>";element+="<td>"+qty+"</td>";element+="<td>"+diskon+"</td>";element+="<td>"+addThousandSeparator(subtotal+"")+"</td>";element+="<td><div class='btn-cancel-menu'>CANCEL</div></td>";element+="</tr>";$(".detail-table tbody").append(element);setTotal()}
function setTotal(){var total=0;var tr=$(".detail-table tbody tr");tr.each(function(){total+=parseInt($(this).attr("data-subtotal"))});total+=total/10;$(".subtotal").attr("data-value",total);$(".subtotal").html(addThousandSeparator(total+""))}
function deleteItem(tr){var subtotal=parseInt(tr.attr("data-subtotal"));tr.remove();setTotal()}