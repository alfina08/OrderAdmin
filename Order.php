<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pelanggaran extends Model
{
    protected $table = "order";
    protected $primaryKey = "id_order";
    protected $fillable = ["id_user","id_pengiriman","bukti_bayar","status"];

    public function user()
    {
      return $this->belongsTo("App\User","id","id_user");
    }
    public function data_pengiriman()
    {
      return $this->belongsTo("App\Data_pengiriman","id_pengiriman","id_pengiriman");
    }
    public function order()
    {
      return $this->belongsTo("App\Order","id_order","id_pengiriman");
    }
    public function products()
    {
      return $this->belongsTo("App\Products","id");
    }
    public function users()
    {
      return $this->belongsTo("App\Users","id");
    }

}