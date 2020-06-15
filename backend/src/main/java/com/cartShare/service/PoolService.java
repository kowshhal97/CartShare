package com.cartShare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.cartShare.entity.AppliedMembers;
import com.cartShare.entity.Order;
import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.Pool;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.Store;
import com.cartShare.entity.User;
import com.cartShare.models.AppliedMemberShallowForm;
import com.cartShare.models.ApplyPoolRequestBody;
import com.cartShare.models.NewPoolRequestBody;
import com.cartShare.models.PoolDeepForm;
import com.cartShare.models.PoolShallowForm;
import com.cartShare.models.UserCompletePoolDetails;
import com.cartShare.models.UserShallowForm;
import com.cartShare.repository.AppliedEmailObject;
import com.cartShare.repository.AppliedMembersRepo;
import com.cartShare.repository.OrderOfAUserRepository;
import com.cartShare.repository.PoolRepo;
import com.cartShare.repository.PoolUserRepo;
import com.cartShare.repository.UserRepository;

@Service
public class PoolService {

	@Autowired
	private PoolRepo poolRepo;

	@Autowired
	PoolUserRepo poolUserRepo;
	@Autowired
	UserRepository userrepository;
	@Autowired
	OrderOfAUserRepository ordUsrRepo;
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private ApplyEmailThread applyEmailThread; 
	
	@Autowired
	AppliedEmailObject appliedEmailObject ;

	@Autowired
	AppliedMembersRepo appliedMembersRepo;

//	void sendEmail() {
//
//        SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo("vamsiganguly@gmail.com");
//
//        msg.setSubject("Testing from Spring Boot");
//        msg.setText("Hello World \n Spring Boot Email");
//
//        javaMailSender.send(msg);
//        System.out.print("Its came");
//
//    }
	public void sendEmail(String text, String receiver) throws MessagingException {
		MimeMessage msg = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(msg, true);
		helper.setTo(receiver);
		helper.setFrom("yashtrivedi618@gmai.com");
		helper.setSubject("Pool Join Request");
		helper.setText(text, true);
		javaMailSender.send(msg);
	}

	public Pool createPool(NewPoolRequestBody request) {

		Pool newPool = new Pool();

		newPool.setPoolId(request.getPoolId());
		newPool.setName(request.getName());
		newPool.setNeighbourhoodName(request.getNeighbourhoodName());
		newPool.setDescription(request.getDescription());

		newPool.setZipCode(request.getZipCode());
		List<PoolUser> members = new ArrayList<PoolUser>();
		PoolUser poolUser = new PoolUser();
		poolUser.setCurrentPool(newPool);
		User user = userrepository.findById(request.getUserId()).get();
		poolUser.setUser(user);
		poolUser.setConstributionStatus(null);
		poolUser.setMyOrder(new ArrayList<OrderOfAUser>());
		poolUser.setCredits(0);
		poolUser.setConstributionStatus("green");
		members.add(poolUser);
		newPool.setMembers(members);
		user.setPoolUser(poolUser);
		newPool.setPoolLeader(user);
		newPool = poolRepo.save(newPool);

//		poolUser = poolUserRepo.save(poolUser);

		return newPool;
	}

	public Object exitPool(Long poolUserId) {
		Optional<PoolUser> pUser = poolUserRepo.findById(poolUserId);
		if (pUser != null) {

			UserShallowForm usf = new UserShallowForm();
			usf = usf.convertToUserShallowForm(pUser.get().getUser());
			poolUserRepo.delete(pUser.get());
			return usf;
		}
		return null;
	}

	public Object updatePoolDetails(NewPoolRequestBody request) {

		Pool newPool = poolRepo.findById(request.getId()).get();
		newPool.setId(request.getId());
		newPool.setName(request.getName());
		newPool.setNeighbourhoodName(request.getNeighbourhoodName());
		newPool.setDescription(request.getDescription());
		newPool.setZipCode(request.getZipCode());
		newPool = poolRepo.save(newPool);
		return request;
	}

	public Object deletePoolDetails(Long poolId) {

		Pool newPool = poolRepo.findById(poolId).get();
		if (newPool.getMembers().size() == 1) {
			User user = newPool.getPoolLeader();
			user.setPoolUser(null);
			userrepository.save(user);
			poolRepo.delete(newPool);
		}

		PoolShallowForm psf = new PoolShallowForm();
		UserShallowForm usf = new UserShallowForm();
		usf = usf.convertToUserShallowForm(newPool.getPoolLeader());
		psf = psf.convertToPoolShallowForm(newPool, usf);

		return psf;
	}

	public Object getPoolDetails(Long poolId) {
		Optional<Pool> pool = poolRepo.findById(poolId);

		return pool.get();

	}

	public Object getPoolCompleteDetails(Long poolId) {
		Optional<Pool> pool = poolRepo.findById(poolId);
		if (pool != null) {
			Pool pools = pool.get();
			return pools;

		}
		return pool;
	}

	public Object convertAppliedMemberTOShallowForm(AppliedMembers user) {
		AppliedMemberShallowForm usf = new AppliedMemberShallowForm();
		User ref = user.getReferencedBy().getUser();
		usf = usf.convertToUserShallowForm(user.getUser(), user.getAppliedPool().getId(), user.getStatus(), ref.getId(),
				ref.getScreenName(), user.getAppliedPool().getPoolId());
		return usf;
	}

	public Object convertPoolTOPoolDeepForm(Pool pools) {
		PoolDeepForm pdf = new PoolDeepForm();
		List<AppliedMemberShallowForm> appliedMembersSF = new ArrayList<AppliedMemberShallowForm>();
		List<AppliedMembers> appliedMembers = pools.getAppliedMembers();
		for (AppliedMembers user : appliedMembers) {
			AppliedMemberShallowForm usf = new AppliedMemberShallowForm();
			User ref = user.getReferencedBy().getUser();
			usf = usf.convertToUserShallowForm(user.getUser(), user.getAppliedPool().getId(), user.getStatus(),
					ref.getId(), ref.getScreenName(), user.getAppliedPool().getPoolId());
			appliedMembersSF.add(usf);
		}
		List<UserShallowForm> membersSF = new ArrayList<UserShallowForm>();
		List<PoolUser> members = pools.getMembers();
		for (PoolUser user : members) {
			UserShallowForm usf = new UserShallowForm();
			usf = usf.convertToUserShallowForm(user.getUser());
			membersSF.add(usf);
		}
		UserShallowForm leader = new UserShallowForm();
		leader = leader.convertToUserShallowForm(pools.getPoolLeader());

		pdf = pdf.convertToPoolDeepForm(pools, membersSF, leader, appliedMembersSF);

		return pdf;
	}

	public Object getPoolDeetailsOfUser(Long userId) throws Exception {

		try {
//			this.sendEmail();
			Optional<User> user = userrepository.findById(userId);
			UserCompletePoolDetails ucmpd = new UserCompletePoolDetails();
			if (user.get() == null) {
				throw new Exception("User does not exist");
			}
			PoolUser pusd = user.get().getPoolUser();
			if (pusd != null) {
				Pool pool = user.get().getPoolUser().getCurrentPool();
				PoolDeepForm pooldf = (PoolDeepForm) convertPoolTOPoolDeepForm(pool);
				ucmpd.setPoolDetails(pooldf);
				ucmpd.setContribution(pusd.getCredits());
				ucmpd.setContributionStatus(pusd.getConstributionStatus());
				Order ord = pool.getCurrentOrder();
				if (ord != null) {
					ucmpd.setCuurentOrderId(ord.getId());
					Store str = ord.getStore();
					if (str != null) {
						ucmpd.setCurrentStoreId(str.getId());
						ucmpd.setStoreName(str.getName());
					}
				}

//				OrderOfAUser ordf = ordUsrRepo.findByOrdergroupAndOrderedByAndStatusNot(ord, pusd,"Delivered");

				ucmpd.setPoolUserId(pusd.getId());
//				if (ordf != null)
//					ucmpd.setCurrentOrderOfaUserId(ordf.getId());
				return ucmpd;
			}
			ucmpd.setPoolList((List<PoolDeepForm>) this.getAllPoolDetails("", "", ""));

			return ucmpd;

		} catch (Exception e) {
			System.out.println(e);
			throw e;
		}

	}

	public Object getAllPoolDetails(String name, String nName, String zipCode) {

		List<Pool> allPools = poolRepo.findByNameLikeAndNeighbourhoodNameLikeAndZipCodeLike("%" + name + "%",
				"%" + nName + "%", "%" + zipCode + "%");
		List<PoolDeepForm> allPoolDetails = new ArrayList<PoolDeepForm>();
		for (Pool pool : allPools) {
			allPoolDetails.add((PoolDeepForm) convertPoolTOPoolDeepForm(pool));

		}
		return allPoolDetails;
	}

	public ApplyPoolRequestBody applyPool(ApplyPoolRequestBody request) throws MessagingException {

		if (!request.getStatus().equals("Approved")) {
			AppliedMembers appliedMembers = new AppliedMembers();
			Pool pool = poolRepo.findById(request.getPoolId()).get();
			User user1 = userrepository.findById(request.getReferenceUserId()).get();
			PoolUser poolUser = poolUserRepo.findByUser(user1);
			User user = userrepository.findById(request.getUserId()).get();
			appliedMembers.setId(request.getAppliedPoolId());
			appliedMembers.setAppliedPool(pool);
			appliedMembers.setReferencedBy(poolUser);
			appliedMembers.setUser(user);
			appliedMembers.setStatus(request.getStatus());
			appliedMembers = appliedMembersRepo.save(appliedMembers);
			request.setAppliedPoolId(appliedMembers.getId());
			String mailReciever = user1.getEmail();
//			String mailReciever = "vamc.mundra@gmail.com";
			String approvalLink = "http://35.155.66.64:8080/applyPool?appliedPoolId=" + request.getAppliedPoolId()
					+ "&userId=" + request.getUserId() + "&poolId=" + request.getPoolId() + "&referenceUserId="
					+ request.getReferenceUserId() + "&status=" + "Approved";
			String disapprovalLink = "http://35.155.66.64:8080/applyPool?appliedPoolId=" + request.getAppliedPoolId()
					+ "&userId=" + request.getUserId() + "&poolId=" + request.getPoolId() + "&referenceUserId="
					+ request.getReferenceUserId() + "&status=" + "Disapprove";

			String mailMsg = " " + user.getScreenName() + " Wants to join your pool " + pool.getName()
					+ " using your reference \n\n" + "<button><a href='" + approvalLink + "'>Accept</a></button>\t"
					+ "<button><a href='" + disapprovalLink + "'>Reject</a></button>";
			this.appliedEmailObject.setReciever(mailReciever);
			this.appliedEmailObject.setText(mailMsg);
			Thread applyThread=new Thread(applyEmailThread,"pickUpThread");
			applyThread.start();
//			this.sendEmail(mailMsg, mailReciever);

		} else {

			AppliedMembers appliedMembers = new AppliedMembers();
			appliedMembers = appliedMembersRepo.findById(request.getAppliedPoolId()).get();
			Pool newPool = appliedMembers.getAppliedPool();
			appliedMembersRepo.delete(appliedMembers);
			User user = userrepository.findById(request.getUserId()).get();
			newPool.setId(request.getPoolId());
			PoolUser poolUser = new PoolUser();
			poolUser.setCurrentPool(newPool);
			poolUser.setUser(user);
			poolUser.setConstributionStatus("green");
			poolUser.setCredits(0);
			poolUser = poolUserRepo.save(poolUser);
			user.setPoolUser(poolUser);
			userrepository.save(user);

		}

		return request;

	}

	public Object applyPoolFromMail(HttpServletRequest request) throws MessagingException {
		Optional<AppliedMembers> amp = appliedMembersRepo
				.findById(Long.parseLong(request.getParameter("appliedPoolId")));
		if (!amp.isPresent()) {
			return "Response Allready Recieved";
		}
		if (request.getParameter("status").equals("Approved")) {
			Pool pool = poolRepo.findById(Long.parseLong(request.getParameter("poolId"))).get();
			User poolLeader = pool.getPoolLeader();
			User appliedUser = userrepository.findById(Long.parseLong(request.getParameter("userId"))).get();

			if (poolLeader.getId() == Long.parseLong(request.getParameter("referenceUserId"))) {
				List<AppliedMembers> appliedMembers = new ArrayList<AppliedMembers>();
				appliedMembers = appliedMembersRepo.findByUser(appliedUser);

				for (AppliedMembers ampd : appliedMembers) {
					appliedMembersRepo.delete(ampd);
				}

				PoolUser poolUser = new PoolUser();
				poolUser.setCurrentPool(pool);
				poolUser.setUser(appliedUser);
				poolUser.setConstributionStatus("green");
				poolUser.setCredits(0);
				poolUser = poolUserRepo.save(poolUser);
				appliedUser.setPoolUser(poolUser);
				userrepository.save(appliedUser);
				String mailReciever = appliedUser.getEmail();

				String mailMsg = " " + pool.getName() + " has accepted your pool request.";
				this.appliedEmailObject.setReciever(mailReciever);
				this.appliedEmailObject.setText(mailMsg);
				Thread applyThread=new Thread(applyEmailThread,"pickUpThread");
				applyThread.start();
//				this.sendEmail(mailMsg, mailReciever);

			} else {
				ApplyPoolRequestBody applyPoolRequest = new ApplyPoolRequestBody();
				applyPoolRequest.setAppliedPoolId(Long.parseLong(request.getParameter("appliedPoolId")));
				applyPoolRequest.setPoolId(pool.getId());
				applyPoolRequest.setReferenceUserId(poolLeader.getId());
				applyPoolRequest.setStatus((request.getParameter("status")));
				applyPoolRequest.setUserId(Long.parseLong(request.getParameter("userId")));
				String approvalLink = "http://35.155.66.64:8080/applyPool?appliedPoolId="
						+ applyPoolRequest.getAppliedPoolId() + "&userId=" + applyPoolRequest.getUserId() + "&poolId="
						+ applyPoolRequest.getPoolId() + "&referenceUserId=" + applyPoolRequest.getReferenceUserId()
						+ "&status=" + "Approved";
				String disapprovalLink = "http://35.155.66.64:8080/applyPool?appliedPoolId="
						+ applyPoolRequest.getAppliedPoolId() + "&userId=" + applyPoolRequest.getUserId() + "&poolId="
						+ applyPoolRequest.getPoolId() + "&referenceUserId=" + applyPoolRequest.getReferenceUserId()
						+ "&status=" + "Disapprove";

				String mailReciever = poolLeader.getEmail();
//		
				String mailMsg = " " + appliedUser.getScreenName() + " Wants to join your pool " + pool.getName()
						+ " using your reference \n\n" + "<button><a href='" + approvalLink + "'>Accept</a></button>\t"
						+ "<button><a href='" + disapprovalLink + "'>Reject</a></button>";
				this.appliedEmailObject.setReciever(mailReciever);
				this.appliedEmailObject.setText(mailMsg);
				
				Thread applyThread=new Thread(applyEmailThread,"pickUpThread");
				applyThread.start();
//				this.sendEmail(mailMsg, mailReciever);


			}
		} else {
			appliedMembersRepo.delete(amp.get());
			return "Thanks for your response";
		}
		return "Thanks for your response";
	}

}
