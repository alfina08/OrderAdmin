<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\data_pengiriman;
use App\detail_order;
use App\order;
use App\products;
use App\users;
use Auth;
class OrderController extends Controller
{
    public function get()
      {
        $order = [];
        foreach (Orders::all() as $o) {
          $detail = [];
          foreach ($o->detail_order as $d) {
            $itemDetail = [
              "id_order" => $d->id_order,
              "id_product" => $d->id_product,
              "nama_product" => $d->product->name,
              "quantity" => $d->quantity
            ];
            array_push($detail, $itemDetail);
          }
          $item = [
            "id_order" => $o->id,
            "id_user" => $o->id_user,
            "nama_user" => $o->user->username,
            "id_address" => $o->id_address,
            "street" => $o->address->street,
            "total" => $o->total,
            "bukti_bayar" => $o->bukti_bayar,
            "status" => $o->status,
            "detail" => $detail
          ];
           array_push($order,$item);
        }
        return response(["orders" => $order]);
      }
    

    public function accept($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "dikirim";
    $o->save();
  }

public function decline($id)
  {
    $o = Orders::where("id", $id)->first();
    $o->status = "ditolak";
    $o->save();
  }
}
 ?>
