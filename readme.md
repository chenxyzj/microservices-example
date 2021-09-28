微服务的简单示例。
# Building Microservices with Node, Docker and Nginx
1. What is a Microservice
2. How do we make one?
3. How do we make them work together?

## Notes (Opinionated)
DO NOT do this for a real project of this size, this is to learn.
A Microservice architecture is for BIG projects with a lot of people.

People will tell you that you can do it at small scale and it is true
but you can also remove ants with a nuclear bomb.

Docker containers can be used without using Microservices, they are not the
same thing!

This is the most common way I see people build container based projects
but my personal favourite is using a queue for all container to container
communication.

## Rule of thumb thoughts (Opinionated)
Docker containers = good for almost all project sizes
Microservices = good for big companies with a lot of code and people
Sweetspot = Monolith app and databases in containers

## Command
0. 创建命名空间
kubectl create ns hello

删除命名空间hello
kubectl delete ns hello

1. 获取namespace
kubectl get ns

2. 获取指定命名空间下的deployment
kubectl -n microservice-app get deployment

3. 获取指定命名空间下的pod
kubectl -n microservice-app get pod

4. 获取指定命名空间下的service
kubectl -n microservice-app get service

5. 删除指定命名空间下的deployment
kubectl -n microservice-app delete deployment microservices-deploy

6. 删除指定命名空间下的service
kubectl -n microservice-app delete service microservices-service

7. 删除指定命名空间下的pod
kubectl -n microservice-app delete pod microservices-deploy-b9ffb65b9-5twcb

8. 强制删除指定命名空间下的pod
kubectl -n microservice-app delete pod microservices-deploy-b9ffb65b9-5twcb --force

9. 在指定命名空间下部署
kubectl -n microservice-app apply -f ./k8s-deployment/deployment.yaml

10. 在指定命名空间下添加服务
kubectl -n microservice-app apply -f ./k8s-deployment/service.yaml

11. 了解指定命名空间下的deployment详情
kubectl -n microservice-app describe deployment microservices-deploy

12. 了解指定命名空间下的pod详情
kubectl -n microservice-app describe pod microservices-deploy-b9ffb65b9-zjpwj

13. 了解指定命名空间下的service详情
kubectl -n microservice-app describe service microservices-service
或者
kubectl -n microservice-app describe svc microservices-service

14. 显示版本
kubectl version

15. 查看指定deployment内的指定容器日志
kubectl -n microservice-app logs deployment/microservices-deploy -c microservices-search

16. 显示current-context
kubectl config current-context

17. 显示多个context
kubectl config get-contexts

18. 显示clusters
kubectl config get-clusters

19. Display users defined in the kubeconfig
kubectl config get-users     

20. 显示cluster信息
$ kubectl cluster-info
Kubernetes control plane is running at https://kubernetes.docker.internal:6443
CoreDNS is running at https://kubernetes.docker.internal:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

21. 端口forward
kubectl -n microservice-app port-forward microservices-deploy-b9ffb65b9-5twcb 5000:8080

22. Print the supported API resources on the server
chenx@DESKTOP-89JKNN7 MINGW64 /d/Study/IndustrialIoT/microservices-example (master)
$ kubectl api-versions
admissionregistration.k8s.io/v1
admissionregistration.k8s.io/v1beta1
apiextensions.k8s.io/v1
apiextensions.k8s.io/v1beta1
apiregistration.k8s.io/v1
apiregistration.k8s.io/v1beta1
apps/v1
authentication.k8s.io/v1
authentication.k8s.io/v1beta1
authorization.k8s.io/v1
authorization.k8s.io/v1beta1
autoscaling/v1
autoscaling/v2beta1
autoscaling/v2beta2
batch/v1
batch/v1beta1
certificates.k8s.io/v1
certificates.k8s.io/v1beta1
coordination.k8s.io/v1
coordination.k8s.io/v1beta1
discovery.k8s.io/v1
discovery.k8s.io/v1beta1
events.k8s.io/v1
events.k8s.io/v1beta1
extensions/v1beta1
flowcontrol.apiserver.k8s.io/v1beta1
networking.k8s.io/v1
networking.k8s.io/v1beta1
node.k8s.io/v1
node.k8s.io/v1beta1
policy/v1
policy/v1beta1
rbac.authorization.k8s.io/v1
rbac.authorization.k8s.io/v1beta1
scheduling.k8s.io/v1
scheduling.k8s.io/v1beta1
storage.k8s.io/v1
storage.k8s.io/v1beta1
v1

23. Print the supported API versions on the server, in the form of "group/version"
$ kubectl api-resources
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
bindings                                       v1                                     true         Binding
componentstatuses                 cs           v1                                     false        ComponentStatus
configmaps                        cm           v1                                     true         ConfigMap
endpoints                         ep           v1                                     true         Endpoints
events                            ev           v1                                     true         Event
limitranges                       limits       v1                                     true         LimitRange
namespaces                        ns           v1                                     false        Namespace
nodes                             no           v1                                     false        Node
persistentvolumeclaims            pvc          v1                                     true         PersistentVolumeClaim
persistentvolumes                 pv           v1                                     false        PersistentVolume
pods                              po           v1                                     true         Pod
podtemplates                                   v1                                     true         PodTemplate
replicationcontrollers            rc           v1                                     true         ReplicationController
resourcequotas                    quota        v1                                     true         ResourceQuota
secrets                                        v1                                     true         Secret
serviceaccounts                   sa           v1                                     true         ServiceAccount
services                          svc          v1                                     true         Service
mutatingwebhookconfigurations                  admissionregistration.k8s.io/v1        false        MutatingWebhookConfiguration
validatingwebhookconfigurations                admissionregistration.k8s.io/v1        false        ValidatingWebhookConfiguration
customresourcedefinitions         crd,crds     apiextensions.k8s.io/v1                false        CustomResourceDefinition
apiservices                                    apiregistration.k8s.io/v1              false        APIService
controllerrevisions                            apps/v1                                true         ControllerRevision
daemonsets                        ds           apps/v1                                true         DaemonSet
deployments                       deploy       apps/v1                                true         Deployment
replicasets                       rs           apps/v1                                true         ReplicaSet
statefulsets                      sts          apps/v1                                true         StatefulSet
tokenreviews                                   authentication.k8s.io/v1               false        TokenReview
localsubjectaccessreviews                      authorization.k8s.io/v1                true         LocalSubjectAccessReview
selfsubjectaccessreviews                       authorization.k8s.io/v1                false        SelfSubjectAccessReview
selfsubjectrulesreviews                        authorization.k8s.io/v1                false        SelfSubjectRulesReview
subjectaccessreviews                           authorization.k8s.io/v1                false        SubjectAccessReview
horizontalpodautoscalers          hpa          autoscaling/v1                         true         HorizontalPodAutoscaler
cronjobs                          cj           batch/v1                               true         CronJob
jobs                                           batch/v1                               true         Job
certificatesigningrequests        csr          certificates.k8s.io/v1                 false        CertificateSigningRequest
leases                                         coordination.k8s.io/v1                 true         Lease
endpointslices                                 discovery.k8s.io/v1                    true         EndpointSlice
events                            ev           events.k8s.io/v1                       true         Event
ingresses                         ing          extensions/v1beta1                     true         Ingress
flowschemas                                    flowcontrol.apiserver.k8s.io/v1beta1   false        FlowSchema
prioritylevelconfigurations                    flowcontrol.apiserver.k8s.io/v1beta1   false        PriorityLevelConfiguration
ingressclasses                                 networking.k8s.io/v1                   false        IngressClass
ingresses                         ing          networking.k8s.io/v1                   true         Ingress
networkpolicies                   netpol       networking.k8s.io/v1                   true         NetworkPolicy
runtimeclasses                                 node.k8s.io/v1                         false        RuntimeClass
poddisruptionbudgets              pdb          policy/v1                              true         PodDisruptionBudget
podsecuritypolicies               psp          policy/v1beta1                         false        PodSecurityPolicy
clusterrolebindings                            rbac.authorization.k8s.io/v1           false        ClusterRoleBinding
clusterroles                                   rbac.authorization.k8s.io/v1           false        ClusterRole
rolebindings                                   rbac.authorization.k8s.io/v1           true         RoleBinding
roles                                          rbac.authorization.k8s.io/v1           true         Role
priorityclasses                   pc           scheduling.k8s.io/v1                   false        PriorityClass
csidrivers                                     storage.k8s.io/v1                      false        CSIDriver
csinodes                                       storage.k8s.io/v1                      false        CSINode
csistoragecapacities                           storage.k8s.io/v1beta1                 true         CSIStorageCapacity
storageclasses                    sc           storage.k8s.io/v1                      false        StorageClass
volumeattachments                              storage.k8s.io/v1                      false        VolumeAttachment

24. 服务扩容、缩容
扩容为3个pods
kubectl -n microservice-app scale --replicas=3 deployment microservices-deploy
所容维1个pod
kubectl -n microservice-app scale --replicas=1 deployment microservices-deploy
自动扩缩容
kubectl -n microservice-app autoscale --min=2 --max=4 deployment microservices-deploy

## 测试负载均衡，发现起作用了，但并不是平均分配。
参考https://zhuanlan.zhihu.com/p/266422557这里
使用 shell执行脚本
for i in {1..10}; do curl http://localhost/api/v1/whereareyou; done 
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775➜  
~ for i in {1..10}; do curl http://localhost/api/v1/whereareyou; done
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}%                                                                                                                            ➜  ~ for i in {1..10}; do curl http://localhost/api/v1/whereareyou; done
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-ngxt8"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}
{"msg":"microservices-deploy-775b888d57-rsjpq"}%