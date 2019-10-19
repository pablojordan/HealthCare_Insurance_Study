corData <-data[,c(4,9)]
names(corData) <- c('Uninsured',"Medicaid")
fit <- lm(Medicaid~Uninsured, corData)
corGraph <-corData %>%
  plot_ly(x = ~Uninsured,text="R=-0.69, p<0.001") %>%
  add_markers(y = ~Medicaid,name="Rate Change") %>%
  add_lines(x = ~Uninsured, y = fitted(fit),name="Correlation")%>%
  layout(title = 'Uninsured vs Medicaid Enrollment')
