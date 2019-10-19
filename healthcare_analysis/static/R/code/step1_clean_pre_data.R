library(stringr)
library(ggmap)
library(readr)
library(plotly)
library(htmltools)
library(ggpubr)
library(VennDiagram)


raw <- read_csv("states.csv")
abb <- read.table("state_abbr.txt",sep='\t',header = T, stringsAsFactors = F)


### ========= filter data ========  ###
raw <- raw [1:51, c(1:4, 11:13)]
raw <- raw[complete.cases(raw),]


r <- merge(raw,abb,by="State",all.x=T)
r$`Medicaid Enrollment Rate Change (2013-2016)` <- round(r$`Medicaid Enrollment Change (2013-2016)`/r$`Medicaid Enrollment (2013)`*100,1)

### ========= add latlng info ========  ###
register_google(key="AIzaSyAEMyR2Sr5a_ZsOsOQQTeuAJzV01suq1sk")
geocodes <- geocode(r$State, source="google")

data <- cbind(r,geocodes)   #library "ggmap"
data$`Uninsured Rate Change (2010-2015)`=as.numeric(stringr::str_remove(data$`Uninsured Rate Change (2010-2015)`,"%"))




