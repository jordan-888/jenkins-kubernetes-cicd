import jenkins.model.*
import org.jenkinsci.plugins.kubernetes.*
import org.jenkinsci.plugins.kubernetes.volumes.*
import org.jenkinsci.plugins.kubernetes.volumes.workspace.*
import hudson.tools.ToolLocationNodeProperty
import hudson.tools.ToolLocationNodeProperty.ToolLocation
import jenkins.model.Jenkins
import io.fabric8.kubernetes.client.Config
import static io.fabric8.kubernetes.client.Config.*
import io.fabric8.kubernetes.client.KubernetesClientException

def jenkins = Jenkins.getInstance()

// Remove existing Kubernetes cloud if it exists
jenkins.clouds.removeAll { it.getClass().name.contains('KubernetesCloud') }

// Configure Kubernetes client details
def kubernetesUsageLimit = 10
def jenkinsTunnel = 'jenkins:50000'
def jenkinsUrl = 'http://jenkins:8080'
def containerCap = 10
def retentionTimeout = 5
def connectTimeout = 10
def readTimeout = 10

// Create Kubernetes cloud instance
def cloud = new KubernetesCloud(
    'kubernetes',
    null,
    'https://kubernetes.default.svc.cluster.local',
    'jenkins',
    jenkinsUrl,
    containerCap.toString(),
    connectTimeout,
    readTimeout,
    retentionTimeout
)

// Configure advanced settings
cloud.setServerCertificate('')
cloud.setCredentialsId('')
cloud.setJenkinsTunnel(jenkinsTunnel)
cloud.setMaxRequestsPerHostStr('32')
cloud.setRetentionTimeout(5)
cloud.setConnectTimeout(10)
cloud.setReadTimeout(10)
cloud.setUsageRestricted(false)
cloud.setMaxRequestsPerHost(32)
cloud.setPodLabels([])

// Add the cloud configuration to Jenkins
jenkins.clouds.add(cloud)

// Save the configuration
jenkins.save()

println "Kubernetes cloud configuration has been updated!"
