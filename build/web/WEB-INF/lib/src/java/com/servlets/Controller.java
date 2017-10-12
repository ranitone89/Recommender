package com.servlets;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.db.DataDB;
import com.google.gson.Gson;

/**
 *
 * @author Nemanja Ranitovic
 */
public class Controller extends HttpServlet {
        private static final long serialVersionUID = 1L;

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest request,
                HttpServletResponse response) throws ServletException, IOException {

                response.setContentType("application/json");
                try {
                        String term = request.getParameter("term");
                        System.out.println("Data from ajax call " + term);

                        DataDB dataDao = new DataDB();
                        ArrayList<String> list = dataDao.getFrameWork(term);

                        String searchList = new Gson().toJson(list);
                        response.getWriter().write(searchList);
                } catch (Exception e) {
                        System.err.println(e.getMessage());
                }
        }
}
