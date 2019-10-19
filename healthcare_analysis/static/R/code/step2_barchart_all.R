data=data[-which(data$`Medicaid Enrollment Rate Change (2013-2016)`<0),]  #renoved three states, Nebraska, OKalhoma, Wyoming

data$neg_base_p <- as.numeric(stringr::str_remove(data$`Uninsured Rate Change (2010-2015)`,"-"))


barchart <- plot_ly()%>%
  add_bars(x=data$State, y=neg_base_p, 
           base=data$`Uninsured Rate Change (2010-2015)`, marker = list(
             color = 'blue'),name="Uninsured Rate Change (2010-2015)")%>%
  add_bars(x=data$State, y=data$`Medicaid Enrollment Rate Change (2013-2016)`,base=0,
           marker = list(color = 'red'),name="Medicaid Enrollment Rate Change (2013-2016)")




