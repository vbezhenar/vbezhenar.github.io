Invoking etcdctl using kubectl for kubeadm cluster

```sh
kubectl exec -n kube-system etcd-control-0 -- sh -c 'ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt --key /etc/kubernetes/pki/etcd/server.key member list'
```
