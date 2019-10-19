insure_sort <- data[order(data$neg_base_p,decreasing = T),]
top10_insure <- insure_sort[1:10,c(1:3,12)]


med_sort <- data[order(data$`Medicaid Enrollment Rate Change (2013-2016)`,decreasing = T),]
top10_med <-  med_sort[1:11,c(1,5:6,9)]
top10_med <- top10_med[-9,]


b10_insure <- insure_sort[37:46,c(1:3,12)]
b10_med <-  med_sort[37:46,c(1,5:7)]




top10_med_graph <- plot_ly(top10_med, x = ~State, y = ~`Medicaid Enrollment (2013)`, type = 'bar', name = 'Medicaid') %>%
  add_trace(y = ~`Medicaid Enrollment (2016)`, name = 'Medicaid') %>%
  add_trace(x = ~State, y = ~`Medicaid Enrollment Rate Change (2013-2016)`, type = 'scatter', mode = 'lines', name = 'Rate Change', yaxis = 'y2',
            line = list(color = '#45171D'))%>%
  layout(title = 'The Top10 fastest increasing cities (Medicaid Enrollment) ',
         xaxis = list(categoryarray =~`Medicaid Enrollment Rate Change (2013-2016)`, categoryorder = "descending"),
         xaxis = list(title = ""),
         yaxis = list(side = 'left', title = 'The Number of Medicaid Enrollment', showgrid = FALSE, zeroline = FALSE),
         yaxis2 = list(side = 'right', overlaying = "y", title = 'Medicaid Enrollment Rate Change(%)', showgrid = FALSE, zeroline = FALSE))

top10_insure$`Uninsured Rate (2010)`=as.numeric(gsub("%","",top10_insure$`Uninsured Rate (2010)`))
top10_insure$`Uninsured Rate (2015)`=as.numeric(gsub("%","",top10_insure$`Uninsured Rate (2015)`))


top10_uninsure_graph <- plot_ly(top10_insure, x = ~State, y = ~`Uninsured Rate (2010)`, type = 'bar', name = 'Uninsured') %>%
  add_trace(y = ~`Uninsured Rate (2015)`, name = 'Uninsured Rate') %>%
  add_trace(x = ~State, y = ~neg_base_p, type = 'scatter', mode = 'lines', yaxis = 'y2', name = 'Rate Change')%>%
  layout(title = 'The Top10 fastest decreasing cities (Uninsured Rate) ',
         xaxis = list(categoryarray =~neg_base_p, categoryorder = "descending"),
         xaxis = list(title = ""),
         yaxis = list(side = 'left', title = 'Uninsured Rate', showgrid = FALSE, zeroline = T),
         yaxis2 = list(side = 'right', overlaying = "y", title = 'Uninsured Rate Change(%)', showgrid = FALSE, zeroline = FALSE))

