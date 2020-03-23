import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            id_order: "",
            id: "",
            id_pengiriman: "",
            total: "",
            bukti_bayar: "",
            status: "",
            detail: "",
            action: "",
            find: "",
            message: "",
        }
        //jika tidak terdapat data token pada lokal storage
         if(!localStorage.getItem("Token")){
            // direct ke halaman login
           window.location = "/";
       }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    // fungsi untuk membuka form tambah data

    get_order= () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/order";
        axios.get(url)
        .then(response => {
            this.setState({order: response.data.order});
            // $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Accept = (id_order) => {
        if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
          $("#modal_accept").modal("hide");
          let url = "http://localhost/toko_online/public/accept/"+id_order;
          let form = new FormData();
          form.append("action", this.state.action);
          form.append("status", this.state.status);
          axios.post(url, form)
          .then(response => {
            this.get_order();
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
    
      Decline = (id_order) => {
        if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
          $("#modal_decline").modal("hide");
          let url = "http://localhost/toko_online/public/decline/"+id_order;
          let form = new FormData();
          form.append("action", this.state.action);
          form.append("status", this.state.status);
          axios.post(url, form)
          .then(response => {
            this.get_order();
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
    componentDidMount = () => {
      this.get_order();
    }
      search = (event) => {
        if (event.keyCode === 13) {
          // keyCode 13 = tombol enter
          let url = "http://localhost/toko_online/public/order";
          let form = new FormData();
          form.append("find", this.state.find);
          axios.post(url, form)
          .then(response => {
            this.setState({order: response.data.order});
          })
          .catch(error => {
            console.log(error);
          });
        }
      
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        // $("#loading").toast("show");
        // menutup form modal
        $("#modal_produk").modal("hide");
        let url = "http://localhost/toko_online/public/produk/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id_produk", this.state.id_produk);
        form.append("nama_produk", this.state.nama_produk);
        form.append("stok", this.state.stok);
        form.append("harga",this.state.harga);
        form.append("deskripsi", this.state.deskripsi);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_produk();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13 ){
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/produk";
            let form = new FormData();
            form.append("find",this.state.find);
            axios.post(url,form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({produk: response.data.produk});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render(){
        return (
          <div className="container">
              <div className="card mt-2">
                  <div className="card-header bg-dark">
                      <div className="row">
                          <div className="col-sm-8">
                              <h4 className="text-white">Data Order</h4>
                          </div>
                            <div className="col-sm-4">
                            <input type="text" className="form-control" name="find"
                            onChange={this.bind} value={this.state.find}
                            onKeyUp={this.search} placeholder="Pencarian..." />
                            </div>
                      </div>
                  </div>
                  {/* content card */}
                  <div className="card-body">
                      <Toast id="message" autohide="true" title="Informasi">
                          {this.state.message}
                      </Toast>
                      <Toast id="loading" autohide="false" title="Informasi">
                          <span className="fa fa-spin faspinner"></span> Sedang Memuat
      </Toast>
                      <table className="table">
                          <thead>
                              <tr>
                                  <th>ID Alamat</th>
                                  <th>ID User</th>
                                  <th>Total</th>
                                  <th>Bukti Bayar</th>
                                  <th>Status</th>
                                  <th>Detail Order</th>
                                  <th>Opsi</th>
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.order.map((item,index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{item.id_user}</td>
                                          <td>{item.id_pengiriman}</td>
                                          <td>{item.total}</td>
                                          <td>
                                          <img src={'http://localhost/toko_online/public/images/' + item.bukti_bayar}
                                          alt={item.bukti_bayar} width="150px" height="200px"/>
                                          </td>
                                          <td>{item.status}</td>
                                          <td>
                                          {item.detail.map((it) => {
                                        return(
                                     <ul key={it.id_order}>
                                     <li>{it.nama_produk} ({it.quantity})</li>
                                     </ul>
                                       )
                                       })}
                                          </td>
                                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                            <span>Accept</span>
                                          </button>
                                          <button className="m-1 btn btn-sm btn-danger"
                                              onClick={() => this.Drop(item.id)}>
                                              <span>Decline</span>
                                          </button>
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                      <Modal id="modal_accept" title="Accept" bg-header="warning" text_header="white">
                       <form onSubmit={this.Accept}>
                         <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                         <button type="submit" className="btn btn-dark m-2">
                            <span className="fa fa-check-circle"></span> Save
                     </button>
                    </form>
                   </Modal>

                      <Modal id="modal_decline" title="Decline" bg-header="warning" text_header="white">
                       <form onSubmit={this.Decline}>
                           <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                           <button type="submit" className="btn btn-dark m-2">
                         <span className="fa fa-check-circle"></span> Save
                     </button>
                    </form>
                 </Modal>
                  </div>
              </div>
          </div>
   );
 }
}
export default Order